import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { DocumentQA } from "@/components/query/DocumentQA"
import {
    BackgroundGridPattern,
    PageLayout,
} from "@/components/Layouts"

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.02 } },
}

export default function Query() {
    const [namespace, setNamespace] = useState("")
    const handleNamespaceSelect = useCallback((selectedNamespace) => {
        console.log("Selected namespace:", selectedNamespace)
        setNamespace(selectedNamespace)
    }, [])

    return (
        <PageLayout>
            <AnimatePresence mode="wait">
                <motion.div className="flex w-full flex-col items-center"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}>
                    <p className="mb-3 mt-2 max-w-lg text-center text-neutral-800 dark:text-neutral-200 md:text-lg">
                        Get expert help instantly.
                    </p>
                    <DocumentQA namespace={namespace} />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 -z-10 overflow-hidden ">
                <BackgroundGridPattern />
            </div>
        </PageLayout>
    )
}
