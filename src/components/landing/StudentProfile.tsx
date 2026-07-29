import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Mail, Hash, School, ShieldCheck, ShieldAlert, LogOut, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function StudentProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!profile) return null;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="overflow-hidden border-border bg-card/50 backdrop-blur-sm">
        <CardHeader className="relative pb-0">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative group">
              <div className="h-24 w-24 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-lg">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <User className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-110">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <CardTitle className="text-2xl font-bold">{profile.full_name || "Student Name"}</CardTitle>
              <CardDescription className="flex flex-wrap items-center justify-center gap-2 mt-1 sm:justify-start">
                <Badge variant={profile.verification_status === 'verified' ? "default" : "secondary"} className="gap-1">
                  {profile.verification_status === 'verified' ? (
                    <>
                      <ShieldCheck className="h-3 w-3" />
                      Verified Student
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="h-3 w-3" />
                      Pending Verification
                    </>
                  )}
                </Badge>
                {profile.is_admin && <Badge variant="outline">Admin</Badge>}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="mt-8 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Hash className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Roll Number</p>
                <p className="font-semibold">{profile.roll_no || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <School className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Department</p>
                <p className="font-semibold">{profile.department || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-4 sm:col-span-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email Address</p>
                <p className="font-semibold">{profile.college_email || "No email"}</p>
              </div>
            </div>
          </div>

          {profile.verification_status === 'pending' && (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm text-yellow-600 dark:text-yellow-400">
              <p className="flex items-center gap-2 font-semibold">
                <ShieldAlert className="h-4 w-4" />
                Account Under Review
              </p>
              <p className="mt-1 opacity-80">
                Your account details are being verified by the college admin. You'll be able to list items once approved.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" className="gap-2" onClick={() => supabase.auth.signOut()}>
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
            <Button className="bg-gradient-primary shadow-[var(--shadow-glow)]">
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
