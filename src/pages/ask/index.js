// pages/ask/[document]/[file].js

import { useRouter } from 'next/router';

const SingleDoc = () => {
    const router = useRouter();
    const { document, file } = router.query;
    try {
    return(
        <>Hello single doc</>
    )
    }catch(err) {
        console.log("error happend in single doc file.",err)
    }
}

export default SingleDoc;