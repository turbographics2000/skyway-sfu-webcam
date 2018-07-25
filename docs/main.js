const myId = (new MediaStream).id;
console.log(`myId:${myId}`);
let stream = null;
function appendVideo(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    document.body.appendChild(video);
    video.play();
}
const constraints = {
    video: true,
    // audio: true // オーディオを追加すると期待する挙動となる
};
navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    console.log(`streamId:${stream.id}`);
    appendVideo(stream);
    const peer = new Peer(myId, {
        key: '01099bd8-1083-4c33-ba9b-564a1377e901' 
    });
    peer.on('open', id => {
        myIdDisp.textContent = id;
        const room = peer.joinRoom('hoge_fuga_piyo_sfu', { mode: 'sfu', stream });
        room.on('stream', stream => {
            console.log(`room on stream peerId:${stream.peerId}`);
            appendVideo(stream);
        });
    });
}).catch(err => {
    console.error(err);
});
