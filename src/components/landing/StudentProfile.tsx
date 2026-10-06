import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Mail, Hash, School, ShieldCheck, ShieldAlert } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  if (loading) return <div className="px-5 py-8 text-center text-sm text-muted-foreground">Loading profile...</div>;
  if (!profile) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-12">
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-7 w-7 text-muted-foreground" />
                </div>
              )}
            </div>
            <div>
              <CardTitle className="font-display text-xl font-bold">{profile.full_name || "Student"}</CardTitle>
              <CardDescription className="mt-2 flex flex-wrap gap-2">
                <Badge variant={profile.verification_status === 'verified' ? "default" : "secondary"} className="gap-1">
                  {profile.verification_status === 'verified' ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                  {profile.verification_status === 'verified' ? "Verified student" : "Verification pending"}
                </Badge>
                {profile.is_admin && <Badge variant="outline">Admin</Badge>}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 border-t border-border pt-6 sm:grid-cols-3">
          {[
            { icon: Hash, label: "Roll number", value: profile.roll_no || "Not set" },
            { icon: School, label: "Department", value: profile.department || "Not set" },
            { icon: Mail, label: "Email", value: profile.college_email || "No email" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 rounded-md border border-border bg-background p-3">
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                <p className="truncate text-sm font-semibold text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
