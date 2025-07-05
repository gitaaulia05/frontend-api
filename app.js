const postForm = document.getElementById("postForm");
const updateForm = document.getElementById("updateForm");
const getForm = document.getElementById("dataSiswa");
let siswaID;

document.addEventListener("DOMContentLoaded", function() {
    if(getForm){
        getData(); 
    }
    if(updateForm){
        detailSiswa();
    }
});

function getData(){
    axios.get('http://localhost/belajar_api/siswa/get.php')
  .then(function (response) {
    const data = response.data;  // 
    const tbody = document.getElementById('dataSiswa');
 tbody.innerHTML = ''; 
    data.forEach(function (item, index) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${item.nama}</td>
        <td>${item.email}</td>
        <td>
          <span><button type="button" class="btn btn-warning" onclick="editSiswa(${item.id})">Edit</button></span>
          <span><button type="button" class="btn btn-danger" onclick="hapusSiswa(${item.id})">Hapus</button></span>
        </td>
      `;
      tbody.appendChild(tr);
    });
  })
  .catch(function (error) {
    console.error(error);
  });
}

  // POST
if(postForm){
    postForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // Ambil data dari input form
    const nama = document.getElementById("nama").value;
    const umur = document.getElementById("umur").value;
    const tanggal_lahir = document.getElementById("tanggal_lahir").value;
    const email = document.getElementById("email").value;
    const aktif = document.getElementById("aktif").value;

    axios.post('http://localhost/belajar_api/siswa/insert.php', {
        nama: nama,
        umur: umur,
        tanggal_lahir: tanggal_lahir,
        email: email,
        aktif: aktif
    })
    .then((response)=> {
        // bentuk dari response sekarang object
         document.getElementById('status').innerText= response.data.status;
         document.getElementById('alert').classList.remove('d-none');
         document.getElementById('alert').classList.add('d-block');
        console.log(response);
    })
    .catch((error)=> {
        console.log(error);
    });

});
}
 
// Redirect data
function editSiswa(idSiswa) {
    window.location.href = `editData.html?id=${idSiswa}`
}

// detail siswa
function detailSiswa(){
  //mengambil query string dari URL
const urlParams = new URLSearchParams(window.location.search);
//Mengambil nilai dari parameter id di URL.
  siswaID = urlParams.get("id");
    if(siswaID) {
           axios.get(`http://localhost/belajar_api/siswa/detail.php?id=${siswaID}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          // Masukkan data ke input form
          document.getElementById('nama').value = data.nama;
          document.getElementById('umur').value = data.umur;
          document.getElementById('tanggal_lahir').value = data.tanggal_lahir;
          document.getElementById('email').value = data.email;
          document.getElementById('aktif').value = data.aktif;
        } else {
          alert("Data tidak ditemukan!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Gagal mengambil data!");
      });

    } else {
        alert("ID siswa tidak ada di URL");
    }

    // UPDATE SISWA
if(updateForm){
    updateForm.addEventListener("submit", function(event) {
    event.preventDefault();
    // Ambil data dari input form
    const nama = document.getElementById("nama").value;
    const umur = document.getElementById("umur").value;
    const tanggal_lahir = document.getElementById("tanggal_lahir").value;
    const email = document.getElementById("email").value;
    const aktif = document.getElementById("aktif").value;

    axios.put(`http://localhost/belajar_api/siswa/update.php`, {
        id : siswaID,
        nama: nama,
        umur: umur,
        tanggal_lahir: tanggal_lahir,
        email: email,
        aktif: aktif
    })
    .then((response)=> {
        // bentuk dari response sekarang object
         document.getElementById('status').innerText= response.data.message;
            document.getElementById('alert').classList.remove('d-none');
            document.getElementById('alert').classList.add('d-block');
        console.log(response);
    })
    .catch((error)=> {
        console.log(error);
    });

});
}
}

// DELETE
function hapusSiswa(idSiswa) {
    if(confirm(`Apakah Anda yakin ingin menghapus data ini dengan id ${idSiswa}?`)){
            axios.delete(`http://localhost/belajar_api/siswa/delete.php`, {
                data : {
                    id: idSiswa
                }
        })
        .then((response) => {            
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

}




