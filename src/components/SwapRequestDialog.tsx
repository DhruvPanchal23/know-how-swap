import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface SwapRequestDialogProps {
  targetUser: any;
  isOpen: boolean;
  onClose: () => void;
}

export const SwapRequestDialog = ({ targetUser, isOpen, onClose }: SwapRequestDialogProps) => {
  const { currentUser, createSwapRequest } = useUser();
  const { toast } = useToast();
  const [selectedOfferedSkill, setSelectedOfferedSkill] = useState("");
  const [selectedRequestedSkill, setSelectedRequestedSkill] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!currentUser || !selectedOfferedSkill || !selectedRequestedSkill) {
      toast({
        title: "Missing Information",
        description: "Please select both skills for the exchange.",
        variant: "destructive"
      });
      return;
    }

    const offeredSkill = currentUser.offeredSkills.find(s => s.id === selectedOfferedSkill);
    const requestedSkill = targetUser.offeredSkills.find(s => s.id === selectedRequestedSkill);

    if (!offeredSkill || !requestedSkill) {
      toast({
        title: "Error",
        description: "Selected skills not found.",
        variant: "destructive"
      });
      return;
    }

    createSwapRequest({
      fromUserId: currentUser.id,
      toUserId: targetUser.id,
      fromUser: currentUser,
      toUser: targetUser,
      offeredSkill,
      requestedSkill,
      message: message || `Hi ${targetUser.name}! I'd love to exchange skills with you.`,
      status: 'pending'
    });

    toast({
      title: "Swap Request Sent!",
      description: `Your request has been sent to ${targetUser.name}.`
    });

    onClose();
    setSelectedOfferedSkill("");
    setSelectedRequestedSkill("");
    setMessage("");
  };

  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request Skill Swap with {targetUser.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Your Skills */}
          <div>
            <Label className="text-base font-medium">I will teach:</Label>
            <div className="mt-2 space-y-2">
              {currentUser.offeredSkills.map((skill) => (
                <Card
                  key={skill.id}
                  className={`cursor-pointer transition-colors ${
                    selectedOfferedSkill === skill.id 
                      ? 'ring-2 ring-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedOfferedSkill(skill.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                      </div>
                      <Badge variant="secondary">{skill.level}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Target User's Skills */}
          <div>
            <Label className="text-base font-medium">I want to learn:</Label>
            <div className="mt-2 space-y-2">
              {targetUser.offeredSkills.map((skill) => (
                <Card
                  key={skill.id}
                  className={`cursor-pointer transition-colors ${
                    selectedRequestedSkill === skill.id 
                      ? 'ring-2 ring-accent bg-accent/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedRequestedSkill(skill.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                      </div>
                      <Badge variant="secondary">{skill.level}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder={`Hi ${targetUser.name}! I'd love to exchange skills with you. I think we could learn a lot from each other!`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedOfferedSkill || !selectedRequestedSkill}
            >
              Send Swap Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};