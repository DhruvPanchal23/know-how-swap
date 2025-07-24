import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SwapsPage = () => {
  const { currentUser, swapRequests, updateSwapRequest } = useUser();
  const { toast } = useToast();

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">Please log in to view your swaps.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sentRequests = swapRequests.filter(req => req.fromUserId === currentUser.id);
  const receivedRequests = swapRequests.filter(req => req.toUserId === currentUser.id);
  const activeSwaps = swapRequests.filter(req => 
    (req.fromUserId === currentUser.id || req.toUserId === currentUser.id) && 
    req.status === 'accepted'
  );

  const handleAccept = (requestId: string) => {
    updateSwapRequest(requestId, 'accepted');
    toast({
      title: "Swap Request Accepted!",
      description: "You can now start coordinating your skill exchange."
    });
  };

  const handleReject = (requestId: string) => {
    updateSwapRequest(requestId, 'rejected');
    toast({
      title: "Request Declined",
      description: "The swap request has been declined."
    });
  };

  const handleComplete = (requestId: string) => {
    updateSwapRequest(requestId, 'completed');
    toast({
      title: "Swap Completed!",
      description: "Don't forget to leave a review for your swap partner."
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Skill Swaps</h1>
        <p className="text-muted-foreground">Manage your skill exchange requests and active swaps</p>
      </div>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="received">
            Received ({receivedRequests.filter(r => r.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="sent">
            Sent ({sentRequests.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeSwaps.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {receivedRequests.filter(req => req.status === 'pending').length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending requests</p>
              ) : (
                <div className="space-y-4">
                  {receivedRequests
                    .filter(req => req.status === 'pending')
                    .map((request) => (
                      <Card key={request.id} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <Avatar>
                              <AvatarImage src={request.fromUser.avatar} />
                              <AvatarFallback>{request.fromUser.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-medium">{request.fromUser.name}</h4>
                              <div className="flex items-center gap-2 my-2">
                                <Badge variant="secondary">{request.offeredSkill.name}</Badge>
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                                <Badge variant="outline">{request.requestedSkill.name}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{request.message}</p>
                              <span className="text-xs text-muted-foreground">
                                {new Date(request.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReject(request.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Decline
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAccept(request.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sent Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {sentRequests.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No sent requests</p>
              ) : (
                <div className="space-y-4">
                  {sentRequests.map((request) => (
                    <Card key={request.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={request.toUser.avatar} />
                          <AvatarFallback>{request.toUser.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{request.toUser.name}</h4>
                            <Badge
                              variant={
                                request.status === 'pending' ? 'secondary' :
                                request.status === 'accepted' ? 'default' :
                                request.status === 'rejected' ? 'destructive' : 'outline'
                              }
                            >
                              {request.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 my-2">
                            <Badge variant="secondary">{request.offeredSkill.name}</Badge>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <Badge variant="outline">{request.requestedSkill.name}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Sent {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Swaps</CardTitle>
            </CardHeader>
            <CardContent>
              {activeSwaps.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active swaps</p>
              ) : (
                <div className="space-y-4">
                  {activeSwaps.map((swap) => {
                    const partner = swap.fromUserId === currentUser.id ? swap.toUser : swap.fromUser;
                    const mySkill = swap.fromUserId === currentUser.id ? swap.offeredSkill : swap.requestedSkill;
                    const partnerSkill = swap.fromUserId === currentUser.id ? swap.requestedSkill : swap.offeredSkill;
                    
                    return (
                      <Card key={swap.id} className="p-4 border-primary/20">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={partner.avatar} />
                            <AvatarFallback>{partner.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Swapping with {partner.name}</h4>
                              <Button
                                size="sm"
                                onClick={() => handleComplete(swap.id)}
                              >
                                Mark as Complete
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 my-2">
                              <Badge variant="secondary">Teaching: {mySkill.name}</Badge>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              <Badge variant="outline">Learning: {partnerSkill.name}</Badge>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              Started {new Date(swap.updatedAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Swaps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">No completed swaps yet</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};