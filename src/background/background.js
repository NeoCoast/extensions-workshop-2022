import * as browser from 'webextension-polyfill';

const notificationsLookup = {};

browser?.downloads?.onChanged.addListener(async (delta) => {
  if (delta?.state?.current !== 'complete') return;

  const searchRes = await browser?.downloads?.search({ id: delta?.id });
  const [newFile] = searchRes;
  const filename = newFile.filename.split('/');
  const iconUrl = await browser?.downloads?.getFileIcon(delta?.id);

  const notificationID = await browser?.notifications?.create(
    {
      iconUrl,
      message: `Want to upload ${filename[filename.length - 1]}?`,
      priority: 2,
      silent: false,
      title: 'NeoPhotos',
      type: 'basic',
    },
  );

  notificationsLookup[notificationID] = newFile;
});

browser?.notifications?.onClicked.addListener(async (notificationID) => {
  await browser?.notifications?.clear(notificationID);
  const data = notificationsLookup[notificationID];
  if (!data) return;

  const sessionData = await browser.storage.local.get([
    'accessToken',
    'client',
    'tokenType',
    'uid',
  ]);

  if (!sessionData) return;

  const filename = data.filename.split('/');
  const res = await fetch(data.url);
  const blob = await res.blob();

  const headers = {};
  headers['Access-Token'] = sessionData.accessToken;
  headers.Client = sessionData.client;
  headers.Uid = sessionData.uid;
  headers['Token-Type'] = sessionData.tokenType || 'Bearer';
  headers['Access-Control-Allow-Origin'] = '*';

  const formData = new FormData();
  formData.append('name', filename[filename.length - 1]);
  formData.append('file', new File([blob], filename[filename.length - 1]));

  const iconUrl = await browser?.downloads?.getFileIcon(data?.id);
  try {
    await fetch('http://localhost:4000/api/v1/assets', {
      body: formData,
      headers,
      method: 'POST',
    });

    await browser?.notifications?.create(
      {
        iconUrl,
        message: 'Successfully uploaded image!',
        priority: 2,
        silent: false,
        title: 'NeoPhotos',
        type: 'basic',
      },
    );
  } catch (error) {
    console.log('error: ', error); // eslint-disable-line
    await browser?.notifications?.create(
      {
        iconUrl,
        message: 'Somethign went wrong :(',
        priority: 2,
        silent: false,
        title: 'NeoPhotos',
        type: 'basic',
      },
    );
  }
});
