let localStream; // Local media stream for the user 1
let remoteStream; // Remote media stream for the user 2
let peerConnection; // RTCPeerConnection for WebRTC
let servers = {
    iceServers:[
        {urls:["stun:stun1.l.google.com:3478", "stun:stun2.l.google.com:19302"]}
    ]
}

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    document.getElementById('user-1').srcObject = localStream;
}

let createOffer = async () => {
    peerConnection = new RTCPeerConnection(servers);

     remoteStream = new MediaStream();
     document.getElementById('user-2').srcObject = remoteStream;

    // Add local stream tracks to the peerconnection
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle incoming remote tracks
    peerConnection.ontrack = (event) => {
        remoteStream.addTrack(event.track);
    };

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription);
        }
    };

    // Create an offer
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    document.getElementById('offer-sdp').value = JSON.stringify(offer);
}

let createAnswer = async () => {
    peerConnection = new RTCPeerConnection(servers);

     remoteStream = new MediaStream();
     document.getElementById('user-2').srcObject = remoteStream;

    // Add local stream tracks to the peerconnection
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle incoming remote tracks
    peerConnection.ontrack = (event) => {
        remoteStream.addTrack(event.track);
    };

    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription);
        }
    };

    let offerSDP = JSON.parse(document.getElementById('offer-sdp').value);
    if(!offerSDP) {
        alert("Please create an offer first.");
        return;
    }
    // Set the remote description
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offerSDP));

    // Create an answer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    document.getElementById('answer-sdp').value = JSON.stringify(answer);
}

let addAnser = () => {
    let answerSDP = JSON.parse(document.getElementById('answer-sdp').value);
    if(!answerSDP) {
        alert("Please create an answer first.");
        return;
    }
  
    if(!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answerSDP);  
    }
}

init()
// Create offer button
document.getElementById('create-offer').addEventListener('click', createOffer);
// Create answer button
document.getElementById('create-answer').addEventListener('click', createAnswer);

document.getElementById('addAnswer').addEventListener('click', addAnser);