// Carrousel d'avis (pages Retraites, Perche, Argia, Yaya) : flèches et compteur ; le glisser du doigt est natif (scroll-snap)
(() => {
  document.querySelectorAll(".slider").forEach(slider => {
    const track = slider.querySelector(".slides");
    const prev = slider.querySelector(".slider-prev"), next = slider.querySelector(".slider-next");
    const count = slider.querySelector(".slider-count span"), last = track.children.length - 1;
    const index = () => Math.round(track.scrollLeft / track.clientWidth);
    const go = i => track.scrollTo({ left: Math.max(0, Math.min(last, i)) * track.clientWidth });
    // Le bloc prend la hauteur de l'avis affiché : pas de vide sous les avis courts
    const update = () => { const i = index(); count.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === last; track.style.height = track.children[i].offsetHeight + "px"; };
    prev.addEventListener("click", () => go(index() - 1));
    next.addEventListener("click", () => go(index() + 1));
    track.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); go(index() + (e.key === "ArrowRight" ? 1 : -1)); }
    });
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    addEventListener("resize", update);
    update();
  });
})();
