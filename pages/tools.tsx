import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ZapierTool } from "@/components/query/ZapierTool"
import {
    BackgroundGridPattern,
    PageLayout,
} from "@/components/Layouts"

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.02 } },
}

export default function Tools() {
    const [namespace, setNamespace] = useState("")
    const handleNamespaceSelect = useCallback((selectedNamespace) => {
        console.log("Selected namespace:", selectedNamespace)
        setNamespace(selectedNamespace)
    }, [])

    return (
        <PageLayout>
            <AnimatePresence mode="wait">
                <motion.div className=" flex w-full flex-col items-center " initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}>
                    <p className="mb-3 mt-2 max-w-lg text-center text-neutral-800 dark:text-neutral-200 md:text-lg">
                        <b>Execute</b> the following examples.
                    </p>
                    <p className="mb-3 mt-1 text-center text-sm text-neutral-800 dark:text-neutral-200">
                        Craft an email applying for sick leave and send it to <b>your_email</b>
                    </p>
                    <p className="mb-3 mt-1 text-center text-sm text-neutral-800 dark:text-neutral-200">
                        Create a Google meet with <b>your_email</b> tomorrow early in the morning
                    </p>
                    <p className="mb-3 mt-1 text-center text-sm text-neutral-800 dark:text-neutral-200">
                        Summarize last email and send a slack message on #mvp channel
                    </p>
                    <div className="mt-6">
                        <ZapierTool namespace={namespace} />
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 -z-10 overflow-hidden ">
                <BackgroundGridPattern />
            </div>
        </PageLayout>
    )
}
