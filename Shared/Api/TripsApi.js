import firebase, {db} from '../../Firebase/firebaseConfig';

const managementCollection = db.collection('Management');
const tripsCollection = db.collection('Trips');
const transCollections = db.collection('Transactions');

export async function getManagementDocs(uid, managementRetrieved) {
    var managementDocs = [];
    var snapshot = await managementCollection.where('UserID', '==', uid).get();
    snapshot.forEach((doc) => {
        managementDocs.push({
            tripId: doc.data().TripID, 
            transId: doc.data().TransID
        });
    })


    // var snapshot = await firebase.firestore()
    //     .collection('Management')
    //     .get()

    // snapshot.forEach((doc) => {
    //     managementList.push(doc.data())
    // });

    managementRetrieved(managementDocs);
}

export async function getTripDocs(tripIdList) {
    var tripDocs = [];
    tripIdList.forEach(temp => {
        tripsCollection.doc(temp.tripId).get().then(data => {
            tripDocs.push(data.data());
        })
    })
    return tripDocs;
}