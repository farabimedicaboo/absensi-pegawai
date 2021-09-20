# Absensi Pegawai

## Instruction

1. Clone repo
2. Run `npm install`
3. Run `node .\seed.js` for seeding
4. Run `npm run dev`

## Documentation API

### 1. Menambah User

Endpoint : (POST Method)

```
/api/user/add
```

Response

```
{
    "message": "Success Add User",
    "employee": {
        "username": "farabiandrika23",
        "name": "Farabi",
        "attendantId": [],
        "_id": "61419d8282f3034dd0969420",
        "__v": 0
    }
}
```

### 2. Melakukan Absensi

Endpoint : (POST Method)

```
/api/absen/
```

Form-data: username, keterangan [hadir, izin, cuti, etc]

Response :

```
{
    "message": "Absensi Sukses",
    "attendant": {
        "status": "izin",
        "employeeId": "5e96cbe292b97300fc901111",
        "_id": "613b347431206592eb832e80",
        "__v": 0
    }
}
```

### 3. Membaca Laporan

Endpoint : (GET Method)

```
/api/laporan
```

Response :

```
{
    "message": "Success Getting Data",
    "result": [
        {
            "_id": "5e96cbe292b97300fc901111",
            "username": "farabiandrika",
            "name": "Muhammad Farabi Andrika",
            "absensi": [
                {
                    "_id": "hadir",
                    "jumlah": 3
                },
                {
                    "_id": "izin",
                    "jumlah": 1
                }
            ]
        },
        {
            "_id": "5e96cbe292b97300fc901112",
            "username": "ilhamurniawan",
            "name": "Ilham Kurniawan",
            "absensi": [
                {
                    "_id": "hadir",
                    "jumlah": 4
                }
            ]
        },
        {
            "_id": "5e96cbe292b97300fc901113",
            "username": "john",
            "name": "John Doe",
            "absensi": [
                {
                    "_id": "cuti",
                    "jumlah": 3
                },
                {
                    "_id": "hadir",
                    "jumlah": 1
                }
            ]
        }
    ]
}
```

### 4. Membaca Laporan Berdasarkan Keterangan

Endpoint : (GET Method)

```
/api/laporan/:keterangan
```

:keterangan (params) : [hadir, cuti, izin, etc]

#### Special Params: "telat"

Response

```
{
    "message": "Success Getting Data",
    "result": [
        {
            "_id": "5e96cbe292b97300fc901111",
            "username": "farabiandrika",
            "name": "Muhammad Farabi Andrika",
            "jumlah": 1,
            "absensi": [
                {
                    "_id": "5e96cbe292b97300fc902224",
                    "status": "hadir",
                    "tanggal": "2021-09-12",
                    "waktu": "15:30"
                }
            ]
        },
        {
            "_id": "5e96cbe292b97300fc901112",
            "username": "ilhamurniawan",
            "name": "Ilham Kurniawan",
            "jumlah": 2,
            "absensi": [
                {
                    "_id": "5e96cbe292b97300fc902227",
                    "status": "hadir",
                    "tanggal": "2021-09-11",
                    "waktu": "15:00"
                },
                {
                    "_id": "5e96cbe292b97300fc902228",
                    "status": "hadir",
                    "tanggal": "2021-09-12",
                    "waktu": "15:30"
                }
            ]
        },
        {
            "_id": "5e96cbe292b97300fc901113",
            "username": "john",
            "name": "John Doe",
            "jumlah": 0,
            "absensi": []
        }
    ]
}
```

## Testing

1. Clone repo
2. Run `node .\seed.js` for seeding (To avoid redudant data of testing post method) or clean database
3. Run `npm run test` for testing

Response

```
 API ENDPOINT TESTING
POST /api/absen 201 47.614 ms - 174
    ✔ Attendance Test (69ms)
GET /api/laporan 200 6.012 ms - 467
    ✔ Getting Report
GET /api/laporan/hadir 200 3.599 ms - 1186
    ✔ Getting Report By Category
GET /api/detail 200 3.471 ms - 1383
    ✔ Getting Detail Attendance of User
POST /api/user/add 201 2.828 ms - 146
    ✔ Add User
```
