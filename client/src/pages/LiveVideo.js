// client/src/pages/LiveVideo.js
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const LiveVideo = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const constraints = { video: true, audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      localVideoRef.current.srcObject = stream;

      // Create peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('new-ice-candidate', { candidate: event.candidate, target: 'targetSocketId' });
        }
      };

      pc.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };

      // Handle signaling messages
      socket.on('video-offer', async (data) => {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('video-answer', { sdp: answer, target: data.sender });
        setConnected(true);
      });
      
      socket.on('video-answer', async (data) => {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        setConnected(true);
      });
      
      socket.on('new-ice-candidate', async (data) => {
        try {
          await pc.addIceCandidate(data.candidate);
        } catch (e) {
          console.error('Error adding received ice candidate', e);
        }
      });
    });

    // Cleanup on unmount
    return () => socket.disconnect();
  }, []);

  const startCall = async () => {
    const pc = pcRef.current;
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    // Replace 'targetSocketId' with the actual target socket id (this is a simplified example)
    socket.emit('video-offer', { sdp: offer, target: 'targetSocketId' });
  };

  return (
    <div>
      <h2>Live Video Streaming</h2>
      <video ref={localVideoRef} autoPlay muted style={{ width: '300px' }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: '300px' }} />
      {!connected && <button onClick={startCall}>Start Call</button>}
    </div>
  );
};

export default LiveVideo;
