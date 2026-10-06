import { Camera, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const KEY = "cc-avatar";
const MAX_BYTES = 3 * 1024 * 1024; // 3 MB

export function ProfileAvatar() {
  const [src, setSrc] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) setSrc(saved);
  }, []);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > MAX_BYTES) {
      alert("Please choose an image under 3 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setSrc(url);
      try {
        localStorage.setItem(KEY, url);
      } catch {
        /* quota — silently ignore */
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      aria-label="Upload profile picture"
      className="group relative grid h-10 w-10 place-items-center overflow-hidden rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {src ? (
        <img src={src} alt="Your profile" className="h-full w-full object-cover" />
      ) : (
        <User className="h-4 w-4" />
      )}
      <span className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <Camera className="h-4 w-4 text-foreground" />
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onPick}
        className="hidden"
      />
    </button>
  );
}
