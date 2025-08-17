import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VideoCallDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  skillName: string;
}

export const VideoCallDialog: React.FC<VideoCallDialogProps> = ({
  isOpen,
  onClose,
  recipientName,
  skillName
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      initializeCall();
    } else {
      cleanup();
    }
    
    return cleanup;
  }, [isOpen]);

  const initializeCall = async () => {
    try {
      // Get user media
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: isVideoEnabled,
        audio: isAudioEnabled
      });
      
      setStream(mediaStream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }

      // Initialize peer connection (simplified for demo)
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      
      peerConnectionRef.current = peerConnection;
      
      // Add local stream to peer connection
      mediaStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, mediaStream);
      });

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      toast({
        title: "Call Initiated",
        description: `Starting video call with ${recipientName} for ${skillName} session.`
      });

      // Simulate connection after 2 seconds
      setTimeout(() => setIsConnected(true), 2000);
      
    } catch (error) {
      console.error('Error accessing media devices:', error);
      toast({
        title: "Camera/Microphone Error",
        description: "Unable to access camera or microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const cleanup = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsConnected(false);
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const endCall = () => {
    cleanup();
    onClose();
    toast({
      title: "Call Ended",
      description: "Video call has been terminated."
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[600px]">
        <DialogHeader>
          <DialogTitle>
            Video Call with {recipientName} - {skillName} Session
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 grid grid-cols-2 gap-4 h-full">
          {/* Local video */}
          <div className="relative bg-muted rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
              You
            </div>
            {!isVideoEnabled && (
              <div className="absolute inset-0 bg-muted-foreground/80 flex items-center justify-center">
                <VideoOff className="h-12 w-12 text-muted" />
              </div>
            )}
          </div>

          {/* Remote video */}
          <div className="relative bg-muted rounded-lg overflow-hidden">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
              {recipientName}
            </div>
            {!isConnected && (
              <div className="absolute inset-0 bg-muted-foreground/80 flex items-center justify-center flex-col gap-2">
                <div className="animate-pulse">
                  <Phone className="h-12 w-12 text-muted" />
                </div>
                <p className="text-muted text-sm">Connecting...</p>
              </div>
            )}
          </div>
        </div>

        {/* Call controls */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant={isVideoEnabled ? "outline" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-12 h-12 p-0"
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant={isAudioEnabled ? "outline" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-12 h-12 p-0"
          >
            {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="destructive"
            size="lg"
            onClick={endCall}
            className="rounded-full w-12 h-12 p-0"
          >
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Note: This is a demo implementation. Production requires WebRTC signaling server.
        </p>
      </DialogContent>
    </Dialog>
  );
};