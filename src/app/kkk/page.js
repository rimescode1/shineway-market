import Link from "next/link";

export default async function IndexPage({ req }) {
  console.log(req, "REQUESTWWW");
  //   const ip = Request.headers["x-real-ip"] || req.connection.remoteAddress;

  return (
    <div>
      {/* <h1>ip address: {ip}</h1> */}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
}
