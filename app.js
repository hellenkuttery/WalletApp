// https://www.chartjs.org/docs/latest/charts/doughnut.html

// const kira = 1000;
// const gida = 500;
// const giyim = 300;
// const fatura = 100;
// const kirtasiye = 100;
// const diger = 200;
const ctx = document.getElementById("myChart");

// new Chart(ctx, {
//   type: "doughnut",
//   data: {
//     labels: ["Blue", "Red", "Orange", "Yellow", "Green", "Purple"],
//     datasets: [
//       {
//         label: [kira, giyim, gida, fatura, kirtasiye, diger],
//         data: [kira, giyim, gida, fatura, kirtasiye, diger],
//         borderWidth: 1,
//         hoverBorderJoinStyle: "miter",
//         borderAlign: "center",
//       },
//     ],
//   },

//   //   options: {
//   //     scales: {
//   //       y: {
//   //         beginAtZero: true
//   //       }
//   //     }
//   //   }
// });

/* -------------------------------------------------------------------------- */
// localStorage.clear()
const gelir = document.querySelector("#gelirInput");
const ekle = document.querySelector("#ekle");
const ekleFormu = document.querySelector("#ekleFormu");
const gelirGoster = document.querySelector("#gelirGoster");
const harcamaGoster = document.querySelector("#harcamaGoster");
const kalanGoster = document.querySelector("#kalanGoster");

let gelirler = JSON.parse(localStorage.getItem("gelirler")) || 0;


/* -------------------------------------------------------------------------- */
ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();

  gelirler = gelirler + Number(gelirInput.value);
  console.log(gelirler);
  localStorage.setItem("Gelirler", gelirler);
  hesaplaGoster();
  gelirInput.value = "";
});
/* -------------------------------------------------------------------------- */
// Harcama Formu

const harcamaFormu = document.querySelector("#harcama-formu");
const tarih = document.querySelector("#tarih");
const miktar = document.querySelector("#miktar");
const harcamaAlani = document.querySelector("#harcamaAlani");
const harcamaTablosu = document.querySelector(".harcamaTablosu");
let harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || [];

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  const yeniHarcama = {
    tarih: tarih.value,
    miktar: Number(miktar.value),
    aciklama: harcamaAlani.value,
    id: new Date().getTime(),
  };

  harcamaListesi.push(yeniHarcama);
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
  harcamalariTablodaGoster(yeniHarcama);
  harcamaFormu.reset();
  hesaplaGoster()
});



//! Tabloya verilerin basılması
// function harcamalariTablodaGoster({ id, miktar, tarih, aciklama }) {
//   harcamaTablosu.innerHTML += `
//           <tr>
//               <th scope="row">${aciklama}</th>
//               <td>${miktar}</td>
//               <td>${tarih}</td>
//               <td> <i id=${id} class="fa-solid fa-trash-can text-danger"  type="button"></i> </td>
//             </tr>`;
            
// // !Silme işlemi
// document.querySelectorAll(".fa-trash-can").forEach((sil)=>{
//   console.log("sil içindeyim")
//   sil.onclick=()=>{
//     sil.parentElement.parentElement.remove()

//     harcamaListesi=harcamaListesi.filter((harca)=>harca.id != sil.id)
//     localStorage.setItem("harcamalar",JSON.stringify(harcamaListesi))
//   }
// })
//  hesaplaGoster()
// }



function harcamalariTablodaGoster() {
  // Tablonun içeriğini temizle
  harcamaTablosu.innerHTML = "";

  // Harcama listesini döngüyle dolaş ve her birini tabloya ekle
  harcamaListesi.forEach(({ id, miktar, tarih, aciklama }) => {
    harcamaTablosu.innerHTML += `
      <tr>
          <td>${tarih}</td>
          <td>${aciklama}</td>
          <td>${miktar}</td>
          <td> <i id=${id} class="fa-solid fa-trash-can text-danger" type="button"></i> </td>
      </tr>`;
  });

  // Silme işlemi için düğmelere olay ekle
  document.querySelectorAll(".fa-trash-can").forEach((sil) => {
    sil.onclick = () => {
      // Tablodan sil
      sil.parentElement.parentElement.remove();

      // Harcama listesinden sil
      harcamaListesi = harcamaListesi.filter((harca) => harca.id != sil.id);
      localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
      hesaplaGoster();
    };
  });
}

/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
// Hesapla ve Göster

function hesaplaGoster() {
  const harcama = harcamaListesi.reduce((acc, item) => acc + Number(item.miktar), 0);
  const gelir=Number(localStorage.getItem("Gelirler")) || 0;
  gelirGoster.textContent = gelir
  harcamaGoster.textContent = harcama;
  const kalan=gelir - harcama;
  kalanGoster.textContent = kalan

  /* -------------------------------------------------------------------------- */
  /* ---------------------------------- CHART --------------------------------- */

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["gelir", "gider", "kalan"],
      datasets: [
        {
          // label: ["kira", "giyim", "gida"],
          data: [gelir,harcama,kalan],
         
          borderWidth: 1,          
          borderAlign: "center",
        },
      ],
    },

    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
  });
}

document.querySelector("#temizle").onclick = () => {
  harcamaListesi = [];
  gelirler = 0;
  hesaplaGoster();
  harcamaTablosu.innerHTML = "";
  localStorage.setItem("harcamalar",JSON.stringify(harcamaListesi))
};

harcamaListesi.forEach((harca) => {
  harcamalariTablodaGoster(harca);
});

hesaplaGoster()