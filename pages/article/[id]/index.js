import { useRouter } from "next/router"
import Link from "next/link"

function article({ article }) {
    // const router = useRouter();
    // const { id } = router.query


    return (
        <>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br />
            <Link href='/'>Go Back</Link>
        </>
    )
}

// THIS FETCHES EVERYTIME YOU WATCH AN ARTICLE
export const getStaticProps = async (context) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

    const article = await res.json()

    const ids = article.map(article => article.id)
    const paths = ids.map(id => ({ params: { id: id.toString() } }))

    return {
        paths,
        fallback: false //we set this to false, to return 404 if id missing
    }
}

export default article