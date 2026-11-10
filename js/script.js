// ===================== KONFIGURACIJA =====================
const WEDDING_DATE = new Date("2027-04-25T16:00:00");

// ===================== OTVARANJE PISMA =====================
const envelope = document.getElementById("envelope");
const envelopePhoto = document.getElementById("envelopePhoto");
const hint = document.getElementById("hint");
const envelopeScene = document.getElementById("envelopeScene");
const invitationPage = document.getElementById("invitationPage");

// kad prava fotografija koverte uspešno učita, sakrij CSS crtež ispod nje
function showPhoto() {
  envelope.classList.add("has-photo");
}
if (envelopePhoto.complete && envelopePhoto.naturalWidth > 0) {
  showPhoto();
}
envelopePhoto.addEventListener("load", showPhoto);

let isOpened = false;

function openLetter() {
  if (isOpened) return;
  isOpened = true;

  envelope.classList.add("is-open");
  hint.classList.add("is-hidden");

  // sakrij kovertu i otkrij stranicu sa informacijama o venčanju
  setTimeout(() => {
    envelopeScene.classList.add("fade-out");
    invitationPage.classList.add("is-visible");
    invitationPage.removeAttribute("aria-hidden");
    document.body.style.overflow = "auto";
  }, 1300);
}

envelope.addEventListener("click", openLetter);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openLetter();
  }
});


// dok pismo nije otvoreno, spreči skrolovanje pozadine
document.body.style.overflow = "hidden";

// ===================== ODBROJAVANJE =====================
const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMinutes = document.getElementById("cd-minutes");
const cdSeconds = document.getElementById("cd-seconds");

function pad(num) {
  return String(num).padStart(2, "0");
}

function updateCountdown() {
  const now = new Date();
  let diff = WEDDING_DATE - now;

  if (diff <= 0) {
    cdDays.textContent = "00";
    cdHours.textContent = "00";
    cdMinutes.textContent = "00";
    cdSeconds.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  cdDays.textContent = pad(days);
  cdHours.textContent = pad(hours);
  cdMinutes.textContent = pad(minutes);
  cdSeconds.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
