export const Genre = [
  "Highlife",
  "Folk",
  "Funk",
  "Soul",
  "Reggae",
  "Afro Pop",
  "R&B",
  "Hip Hop",
  "Rap",
  "Soukous",
  "Gospel",
  "Afrobeat",
  "Classical",
  "Pop",
  "Jazz",
  "Fuji",
  "Juju",
  "Boogie",
  "Choral",
  "Blues",
  "Electronic",
  "Disco",
  "Apala",
  "Rock",
  "Waka",
  "Apola",
  "Soul",
  "Afro Soul",
  "Alternative",
  "Afrobeats",
  "Afro-Fusion",
  "Psychedelic",
  "latin",
  "Afro Cuban",
  "Alternative Folk",
  "Dance-pop",
  "Dancehall",
  "Christian",
  "Calypso",
  "Trap",
  "Neo Soul",
  "Reggaeton",
  "Country",
  "Choral",
  "Emo-",
  "Opera",
  "Pop Rock",
  "Azonto",
  "Soca",
  "Ogene",
  "Dance",
  "Pachanga",
  "Roots Reggae",
  "Sakara",
  "synth-pop",
  "Merengue",
  "Rumba",
  "Religious",
  "Afro-Dancehall",
].sort((a,b)=>{
	let fa = a.toLowerCase(),
		fb = b.toLowerCase();

	if (fa < fb) {
		return -1;
	}
	if (fa > fb) {
		return 1;
	}
	return 0;
});
