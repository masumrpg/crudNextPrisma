import Link from "next/link"

const Home = () => {
  const link = '/products';

  return (
    <>
    <head>
        <title>Home Page</title>
        <meta name="description" content="Deskripsi halaman Anda" />
        {/* Tambahkan metadata lainnya di sini */}
    </head>
    <div className="flex justify-center pt-80">
      <Link href={link} className="btn btn-primary">Products</Link>
    </div>
    </>
  )
}

export default Home