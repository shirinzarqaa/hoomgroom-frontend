// import { sql } from '@vercel/postgres';
//
// export async function POST(req: Request) {
//   const { username, password } = await req.json();
//
//   const { rows } = await sql`
//     SELECT * from pengguna
//     WHERE username = ${username}
//     AND password = ${password}
//   `;
//
//   if (rows.length > 0) {
//     return Response.json(
//       { message: 'Login berhasil', username: rows[0].username, negara_asal: rows[0].negara_asal },
//       { status: 200 }
//     );
//   } else {
//     return Response.json(
//       { message: 'Username atau Password salah' },
//       { status: 401 }
//     );
//   }
// }