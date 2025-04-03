
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, ArrowUp, ArrowDown, Minus } from "lucide-react";

const studentLeaderboard = [
  { id: 1, name: "Alex Johnson", college: "MIT", score: 2450, badge: "Hackathon Master", avatar: "https://i.pravatar.cc/150?img=1", change: "up" },
  { id: 2, name: "Priya Singh", college: "IIT Delhi", score: 2340, badge: "Tech Innovator", avatar: "https://i.pravatar.cc/150?img=5", change: "up" },
  { id: 3, name: "Michael Chang", college: "Stanford", score: 2100, badge: "AI Champion", avatar: "https://i.pravatar.cc/150?img=3", change: "down" },
  { id: 4, name: "Sarah Williams", college: "Harvard", score: 1980, badge: "Design Guru", avatar: "https://i.pravatar.cc/150?img=4", change: "same" },
  { id: 5, name: "Raj Patel", college: "BITS Pilani", score: 1850, badge: "Code Ninja", avatar: "https://i.pravatar.cc/150?img=7", change: "up" },
];

const collegeLeaderboard = [
  { id: 1, name: "Massachusetts Institute of Technology", events: 45, score: 3800, badge: "Tech Pioneer", avatar: "/placeholder.svg", change: "same" },
  { id: 2, name: "Indian Institute of Technology, Delhi", events: 38, score: 3650, badge: "Innovation Hub", avatar: "/placeholder.svg", change: "up" },
  { id: 3, name: "Stanford University", events: 42, score: 3400, badge: "Research Excellence", avatar: "/placeholder.svg", change: "up" },
  { id: 4, name: "BITS Pilani", events: 32, score: 3100, badge: "Startup Incubator", avatar: "/placeholder.svg", change: "down" },
  { id: 5, name: "Harvard University", events: 36, score: 2900, badge: "Entrepreneurship Center", avatar: "/placeholder.svg", change: "down" },
];

const Leaderboard = () => {
  const [tab, setTab] = useState("students");
  
  return (
    <section id="leaderboard" className="py-16 bg-secondary/50">
      <div className="container px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Leaderboard
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Top performers and most active participants on our platform
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="students" className="w-full" onValueChange={setTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="students">Top Students</TabsTrigger>
              <TabsTrigger value="colleges">Top Colleges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="glass-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4">Rank</th>
                      <th className="text-left p-4">Student</th>
                      <th className="text-left p-4 hidden md:table-cell">College</th>
                      <th className="text-left p-4 hidden md:table-cell">Badge</th>
                      <th className="text-left p-4">Score</th>
                      <th className="text-left p-4 hidden md:table-cell">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentLeaderboard.map((student, index) => (
                      <tr key={student.id} className="hover:bg-secondary/50">
                        <td className="p-4 flex items-center gap-2">
                          {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                          {index === 1 && <Trophy className="w-5 h-5 text-gray-400" />}
                          {index === 2 && <Trophy className="w-5 h-5 text-amber-700" />}
                          {index > 2 && <span className="font-medium">{index + 1}</span>}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <img src={student.avatar} alt={student.name} />
                            </Avatar>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell text-muted-foreground">{student.college}</td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <Medal className="w-4 h-4 text-eventify-purple" />
                            <span className="text-sm">{student.badge}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold">{student.score}</td>
                        <td className="p-4 hidden md:table-cell">
                          {student.change === "up" && <ArrowUp className="w-5 h-5 text-green-500" />}
                          {student.change === "down" && <ArrowDown className="w-5 h-5 text-red-500" />}
                          {student.change === "same" && <Minus className="w-5 h-5 text-gray-400" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center p-4 border-t border-border">
                <Button variant="outline" size="sm">View Full Leaderboard</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="colleges" className="glass-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4">Rank</th>
                      <th className="text-left p-4">College</th>
                      <th className="text-left p-4 hidden md:table-cell">Events</th>
                      <th className="text-left p-4 hidden md:table-cell">Badge</th>
                      <th className="text-left p-4">Score</th>
                      <th className="text-left p-4 hidden md:table-cell">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collegeLeaderboard.map((college, index) => (
                      <tr key={college.id} className="hover:bg-secondary/50">
                        <td className="p-4 flex items-center gap-2">
                          {index === 0 && <Trophy className="w-5 h-5 text-yellow-500" />}
                          {index === 1 && <Trophy className="w-5 h-5 text-gray-400" />}
                          {index === 2 && <Trophy className="w-5 h-5 text-amber-700" />}
                          {index > 2 && <span className="font-medium">{index + 1}</span>}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <img src={college.avatar} alt={college.name} />
                            </Avatar>
                            <span className="font-medium">{college.name}</span>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell text-muted-foreground">{college.events} Events</td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <Medal className="w-4 h-4 text-eventify-purple" />
                            <span className="text-sm">{college.badge}</span>
                          </div>
                        </td>
                        <td className="p-4 font-bold">{college.score}</td>
                        <td className="p-4 hidden md:table-cell">
                          {college.change === "up" && <ArrowUp className="w-5 h-5 text-green-500" />}
                          {college.change === "down" && <ArrowDown className="w-5 h-5 text-red-500" />}
                          {college.change === "same" && <Minus className="w-5 h-5 text-gray-400" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center p-4 border-t border-border">
                <Button variant="outline" size="sm">View Full Leaderboard</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
