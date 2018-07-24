const myId = (new MediaStream).id;
console.log(`myId:${myId}`);
let stream = null;
navigator.mediaDevices.getUserMedia({
    video: {
        mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: streamId
        }
    }
}).then(stream => {
    console.log(`streamId:${stream.id}`);
    localView.srcObject = stream;
    const peer = new Peer(myId, {
        key: '01099bd8-1083-4c33-ba9b-564a1377e901'
    });
    peer.on('open', id => {
        myIdDisp.textContent = id;
        const room = peer.joinRoom('hoge_fuga_piyo', { mode: 'sfu', stream });
        room.on('stream', stream => {
            console.log(`room on stream peerId:${stream.peerId}`);
            remoteView.srcObject = stream;
        });
    });
}).catch(err => {
    console.error(err);
})
