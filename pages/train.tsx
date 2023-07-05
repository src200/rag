import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card } from "@/components/Card"
import { FileUpload } from "@/components/train/FileUpload"
import { UrlScraper } from "@/components/train/UrlScraper"
import {
    BackgroundGridPattern,
    PageLayout,
} from "@/components/Layouts"

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.02 } },
}

export default function Train() {
    const [namespace, setNamespace] = useState("")
    const handleNamespaceSelect = useCallback((selectedNamespace) => {
        console.log("Selected namespace:", selectedNamespace)
        setNamespace(selectedNamespace)
    }, [])

    return (
        <PageLayout>
            <AnimatePresence mode="wait">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeIn}
                >
                    <div className="flex items-center justify-between gap-5">
                        <Card
                            cardDetails={{
                                name: "Upload",
                                description:
                                    "Upload your documents to create embeddings",
                            }}
                        >
                            <FileUpload namespace={namespace} />
                        </Card>

                        <Card
                            cardDetails={{
                                name: "Scrape",
                                description: "Scrape URLs to generate embeddings",
                            }}
                        >
                            <UrlScraper namespace={namespace} />
                        </Card>
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 -z-10 overflow-hidden ">
                <BackgroundGridPattern />
            </div>
        </PageLayout>
    )
}
