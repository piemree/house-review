import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
  { CITYCODE: "001", CITYNAME: "ADANA" },
  { CITYCODE: "002", CITYNAME: "ADIYAMAN" },
  { CITYCODE: "003", CITYNAME: "AFYONKARAHİSAR" },
  { CITYCODE: "004", CITYNAME: "AĞRI" },
  { CITYCODE: "005", CITYNAME: "AMASYA" },
  { CITYCODE: "006", CITYNAME: "ANKARA" },
  { CITYCODE: "007", CITYNAME: "ANTALYA" },
  { CITYCODE: "008", CITYNAME: "ARTVİN" },
  { CITYCODE: "009", CITYNAME: "AYDIN" },
  { CITYCODE: "010", CITYNAME: "BALIKESİR" },
  { CITYCODE: "011", CITYNAME: "BİLECİK" },
  { CITYCODE: "012", CITYNAME: "BİNGÖL" },
  { CITYCODE: "013", CITYNAME: "BİTLİS" },
  { CITYCODE: "014", CITYNAME: "BOLU" },
  { CITYCODE: "015", CITYNAME: "BURDUR" },
  { CITYCODE: "016", CITYNAME: "BURSA" },
  { CITYCODE: "017", CITYNAME: "ÇANAKKALE" },
  { CITYCODE: "018", CITYNAME: "ÇANKIRI" },
  { CITYCODE: "019", CITYNAME: "ÇORUM" },
  { CITYCODE: "020", CITYNAME: "DENİZLİ" },
  { CITYCODE: "021", CITYNAME: "DİYARBAKIR" },
  { CITYCODE: "022", CITYNAME: "EDİRNE" },
  { CITYCODE: "023", CITYNAME: "ELAZIĞ" },
  { CITYCODE: "024", CITYNAME: "ERZİNCAN" },
  { CITYCODE: "025", CITYNAME: "ERZURUM" },
  { CITYCODE: "026", CITYNAME: "ESKİŞEHİR" },
  { CITYCODE: "027", CITYNAME: "GAZİANTEP" },
  { CITYCODE: "028", CITYNAME: "GİRESUN" },
  { CITYCODE: "029", CITYNAME: "GÜMÜŞHANE" },
  { CITYCODE: "030", CITYNAME: "HAKKARİ" },
  { CITYCODE: "031", CITYNAME: "HATAY" },
  { CITYCODE: "032", CITYNAME: "ISPARTA" },
  { CITYCODE: "033", CITYNAME: "MERSİN" },
  { CITYCODE: "034", CITYNAME: "İSTANBUL" },
  { CITYCODE: "035", CITYNAME: "İZMİR" },
  { CITYCODE: "036", CITYNAME: "KARS" },
  { CITYCODE: "037", CITYNAME: "KASTAMONU" },
  { CITYCODE: "038", CITYNAME: "KAYSERİ" },
  { CITYCODE: "039", CITYNAME: "KIRKLARELİ" },
  { CITYCODE: "040", CITYNAME: "KIRŞEHİR" },
  { CITYCODE: "041", CITYNAME: "KOCAELİ" },
  { CITYCODE: "042", CITYNAME: "KONYA" },
  { CITYCODE: "043", CITYNAME: "KÜTAHYA" },
  { CITYCODE: "044", CITYNAME: "MALATYA" },
  { CITYCODE: "045", CITYNAME: "MANİSA" },
  { CITYCODE: "046", CITYNAME: "KAHRAMANMARAŞ" },
  { CITYCODE: "047", CITYNAME: "MARDİN" },
  { CITYCODE: "048", CITYNAME: "MUĞLA" },
  { CITYCODE: "049", CITYNAME: "MUŞ" },
  { CITYCODE: "050", CITYNAME: "NEVŞEHİR" },
  { CITYCODE: "051", CITYNAME: "NİĞDE" },
  { CITYCODE: "052", CITYNAME: "ORDU" },
  { CITYCODE: "053", CITYNAME: "RİZE" },
  { CITYCODE: "054", CITYNAME: "SAKARYA" },
  { CITYCODE: "055", CITYNAME: "SAMSUN" },
  { CITYCODE: "056", CITYNAME: "SİİRT" },
  { CITYCODE: "057", CITYNAME: "SİNOP" },
  { CITYCODE: "058", CITYNAME: "SİVAS" },
  { CITYCODE: "059", CITYNAME: "TEKİRDAĞ" },
  { CITYCODE: "060", CITYNAME: "TOKAT" },
  { CITYCODE: "061", CITYNAME: "TRABZON" },
  { CITYCODE: "062", CITYNAME: "TUNCELİ" },
  { CITYCODE: "063", CITYNAME: "ŞANLIURFA" },
  { CITYCODE: "064", CITYNAME: "UŞAK" },
  { CITYCODE: "065", CITYNAME: "VAN" },
  { CITYCODE: "066", CITYNAME: "YOZGAT" },
  { CITYCODE: "067", CITYNAME: "ZONGULDAK" },
  { CITYCODE: "068", CITYNAME: "AKSARAY" },
  { CITYCODE: "069", CITYNAME: "BAYBURT" },
  { CITYCODE: "070", CITYNAME: "KARAMAN" },
  { CITYCODE: "071", CITYNAME: "KIRIKKALE" },
  { CITYCODE: "072", CITYNAME: "BATMAN" },
  { CITYCODE: "073", CITYNAME: "ŞIRNAK" },
  { CITYCODE: "074", CITYNAME: "BARTIN" },
  { CITYCODE: "075", CITYNAME: "ARDAHAN" },
  { CITYCODE: "076", CITYNAME: "IĞDIR" },
  { CITYCODE: "077", CITYNAME: "YALOVA" },
  { CITYCODE: "078", CITYNAME: "KARABÜK" },
  { CITYCODE: "079", CITYNAME: "KİLİS" },
  { CITYCODE: "080", CITYNAME: "OSMANİYE" },
  { CITYCODE: "081", CITYNAME: "DÜZCE" },
];

const url = "https://www.generali.com.tr/dask-address-code-calculate";

// async function main() {
//   const formData = new FormData();
//   formData.append("value", "008");
//   formData.append("status", "1");
//   const response = await fetch(url, {
//     method: "POST",
//     body: formData,
//   });
//   const data = await response.json();
//   const districtRequests = data.response.map((item: any) => {
//     return prisma.district.create({
//       data: {
//         code: item.DISTRICTVALUECODE,
//         name: item.DISTRICTVALUENAME,
//         cityId: "008",
//       },
//     });
//   });

//   // crate prisma transaction
//   const transaction = await prisma.$transaction(districtRequests);
// }

async function main() {
  const cityRequests = cities.map((item) => {
    return prisma.city.create({
      data: {
        code: item.CITYCODE,
        name: item.CITYNAME,
      },
    });
  });

  // crate prisma transaction
  const transaction = await prisma.$transaction(cityRequests);
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
