import AsyncStorage from '@react-native-async-storage/async-storage';
import {err} from 'react-native-svg/lib/typescript/xml';
import RNFetchBlob from 'rn-fetch-blob';

export const DownloadImage = async () => {
  const storageUrl: string =
    'https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport';

  // send http request in a new thread (using native code)
  RNFetchBlob.config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache: true,
  })
    .fetch(
      'GET',
      'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg',
      {
        //   Authorization: 'Bearer access-token...',
        // more headers  ..
      },
    )
    .then(res => {
      console.log(res);
      let status = res.info().status;

      if (status == 200) {
        // // the conversion is done in native code
        // let base64Str = res.base64();
        // // the following conversions are done in js, it's SYNC
        // let text = res.text();
        // let json = res.json();

        console.log('image saved');
      } else {
        // handle other status code
        console.log('Something else happened');
      }
    })
    // Something went wrong:
    .catch((errorMessage: any) => {
      // error handling
      console.log(errorMessage);
    });
};

export const RestoreImageViaAsyncStorage = async () => {
  let image: string = '';
  try {
    const value = await AsyncStorage.getItem('profileImage');
    if (value !== null) {
      // value previously stored
      image = value;
    }
  } catch (e) {
    // error reading value
    console.error('There was an retrieving the image path via async: ' + e);
  }
  return image;
};

// const getExtention = (filename: string) => {
//   //To get the file extenssion
//   return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
// };

// export function downloadAudio(urlArray: any) {
//   //download every section in the urlArray

//   return (dispatch: (arg0: any) => void) => {
//     Promise.all(
//       urlArray.map(async (section: any) => {
//         dispatch(startDownload(section.section_id));
//         console.log('download start for id = ', section.section_id); //star download
//         const res = await RNFetchBlob.config({
//           path:
//             RNFetchBlob.fs.dirs.DocumentDir +
//             '/courseSections/' +
//             section.section_id +
//             '.mp3',
//           appendExt: 'mp3',
//         })
//           .fetch('GET', section.section_url, {
//             'Cache-Control': 'no-store',
//           })
//           .progress({count: 10}, (received: number, total: number) => {
//             console.log(
//               'progress for section ${section.section_id}: ',
//               Math.floor((received / total) * 100),
//               '%',
//             );
//             dispatch(
//               downloadProgress({
//                 id: section.section_id,
//                 progress: Math.floor((received / total) * 100) / 100,
//               }),
//             );
//           });
//         console.log('section $(section.section_id} is saved to: ', res.path());
//         const pathInfo = {path: res.path(), id: section.section_id};
//         return dispatch(downloadSuccess(pathInfo)); //download finished
//       }),
//     ).catch((error: any) => {
//       console.log(error.statusCode, ' error: ', error.error);
//     });

//     function startDownload(section_id: any): any {
//       throw new Error('Function not implemented.');
//     }

//     function downloadProgress(arg0: {id: any; progress: number}): any {
//       throw new Error('Function not implemented.');
//     }

//     function downloadSuccess(pathInfo: any): any {
//       throw new Error('Function not implemented.');
//     }
//   };
// }
