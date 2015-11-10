/* global superagent, Rx */
let Observable,
    apiUrl,
    reactiveInspiration;

apiUrl = 'http://localhost:8000/inspiration';
Observable = Rx.Observable;

reactiveInspiration = Observable.create((observer) => {
    console.log("Sending request.");
    superagent
        .get(apiUrl)
        .end((err, res) => {
            console.log('Got response');
            if (err) {
                return observer.onError(err);
            }

            let inspiration;

            inspiration = JSON.parse(res.text).joke;

            observer.onNext(inspiration);
            observer.onCompleted();

            // Dispose function which is guaranteed to get called when Observable stops.
            // All resource-freeing work shall be done in here.
            return () => {
                console.log('Release the Kraken!');
            };
        });
});

// reactiveInspiration
//     .subscribe(
//         (inspiration) => {
//             console.log('Get inspired: ', inspiration);
//         },
//         (err) => {
//             console.log('Error while getting inspired', err);
//         },
//         () => {
//             console.log('Done getting inspired!');
//         }
//     );
