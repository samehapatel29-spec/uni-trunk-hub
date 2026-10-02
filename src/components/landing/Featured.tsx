import { Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import textbook from "@/assets/listing-textbook.jpg";
import calculator from "@/assets/listing-calculator.jpg";
import arduino from "@/assets/listing-arduino.jpg";
import cycle from "@/assets/listing-cycle.jpg";

const listings = [
  { title: "Engineering Mathematics + notes", price: "₹450", condition: "Used · Good", seller: "Aditi · CSE ’27", pickup: "Girls’ Hostel gate", image: textbook },
  { title: "Casio fx-991ES Plus", price: "₹700", condition: "Used · Like new", seller: "Rohan · ME ’26", pickup: "Main library", image: calculator },
  { title: "Arduino Uno starter kit", price: "₹1,150", condition: "Used · Complete kit", seller: "Neha · ECE ’25", pickup: "ECE block", image: arduino },
  { title: "Campus cycle with lock", price: "₹3,200", condition: "Used · Fair", seller: "Kabir · Civil ’26", pickup: "Hostel Block C", image: cycle },
  { title: "First-year mechanics bundle", price: "₹600", condition: "Used · Good", seller: "Ishaan · ME ’27", pickup: "Academic Block 2", image: textbook },
  { title: "Scientific calculator", price: "₹550", condition: "Used · Good", seller: "Meera · EEE ’26", pickup: "Central canteen", image: calculator },
  { title: "ESP32 sensors bundle", price: "₹900", condition: "Used · Tested", seller: "Anuj · ECE ’25", pickup: "Innovation lab", image: arduino },
  { title: "Blue city cycle", price: "₹2,800", condition: "Used · Serviced", seller: "Sana · IT ’26", pickup: "Hostel Block B", image: cycle },
];

export function Featured() {
  return (
    <section id="browse" className="mx-auto max-w-6xl px-5 py-10 sm:py-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Fresh around campus</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pickup nearby. Pay after you check the item.</p>
        </div>
        <a href="#browse" className="shrink-0 text-sm font-semibold text-primary hover:underline">View all</a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {listings.map((item, index) => (
          <article key={`${item.title}-${index}`} className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading={index < 4 ? "eager" : "lazy"} width={816} height={816} />
              <Button variant="secondary" size="icon" aria-label={`Save ${item.title}`} className="absolute right-2 top-2 h-8 w-8 rounded-md border border-border bg-card/95 shadow-none">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 sm:p-4">
              <p className="font-display text-lg font-bold text-foreground">{item.price}</p>
              <h3 className="mt-0.5 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-foreground">{item.title}</h3>
              <p className="mt-2 text-xs font-medium text-muted-foreground">{item.condition}</p>
              <p className="mt-2 truncate text-xs text-foreground">{item.seller}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3 shrink-0" /> <span className="truncate">{item.pickup}</span></p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}