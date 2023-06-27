import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card } from "@/components/Card"
import {
  BackgroundGridPattern,
  PageLayout,
} from "@/components/Layouts"
import { NamespaceSelector } from "@/components/NamespaceInput"
import { DocumentQA } from "@/components/query/DocumentQA"
import { ZapierTool } from "@/components/query/ZapierTool"
import { FileUpload } from "@/components/train/FileUpload"
import { UrlScraper } from "@/components/train/UrlScraper"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function ToggleHeading({ text, embedding }) {
  const activeHeading = text == embedding
  return (
    <h1
      className={cn(
        " my-6 font-aboreto text-3xl transition duration-300 sm:text-6xl",
        activeHeading ? "text-mauve-12" : "text-mauve-8"
      )}
    >
      {text}
    </h1>
  )
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.02 } },
}

export default function Pinecone() {
  const [namespace, setNamespace] = useState("")
  const [embedding, setEmbedding] = useState("TRAIN")
  const [animateOnce, setAnimateOnce] = useState(true)
  const handleNamespaceSelect = useCallback((selectedNamespace) => {
    console.log("Selected namespace:", selectedNamespace)
    setNamespace(selectedNamespace)
  }, [])

  function toggleEmbedding() {
    setEmbedding(embedding === "TRAIN" ? "QUERY" : "TRAIN")
    setAnimateOnce(false)
  }

  const imageVariants = {
    rotate: {
      rotateY: 90,
    },
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center gap-3 px-3">
        <div className="z-30 my-16 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <Tabs className="p-5" defaultValue="tab1">
              <TabsList aria-label="Infernix offerings">
                <TabsTrigger value="tab1">
                  Train
                </TabsTrigger>
                <TabsTrigger value="tab2">
                  Query Knowledge base
                </TabsTrigger>
                <TabsTrigger value="tab3">
                  Tools
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <motion.div
                  key={"TRAIN"}
                  className="flex w-full flex-col items-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeIn}
                >
                  <div className="flex flex-col items-center justify-between md:mt-6 md:flex-row md:items-start ">
                    <div className="  pt-4 md:mx-4 md:mt-0 md:max-w-2xl">
                      <div className="  w-full">
                        <Card
                          cardDetails={{
                            name: "Upload",
                            description:
                              "Upload your documents to create embeddings",
                          }}
                        >
                          <FileUpload namespace={namespace} />
                        </Card>
                      </div>
                    </div>

                    <div className=" pt-4 md:mx-4 md:mt-0 md:max-w-2xl">
                      <div className=" w-full">
                        <Card
                          cardDetails={{
                            name: "Scrape",
                            description: "Scrape URLs to generate embeddings",
                          }}
                        >
                          <UrlScraper namespace={namespace} />
                        </Card>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="tab2">
                <div className=" flex w-full flex-col items-center ">
                  <p className="mb-3 mt-2 max-w-lg text-center text-neutral-800 dark:text-neutral-200 md:text-lg">
                    <b>Query</b> the embedded knowledge provided by you.
                   
                  </p>
                  <DocumentQA namespace={namespace} />
                </div>
              </TabsContent>
              <TabsContent value="tab3">
                <div className=" flex w-full flex-col items-center ">
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
                </div>
              </TabsContent>
            </Tabs>
          </AnimatePresence>
          <div className="absolute inset-0 -z-10 overflow-hidden ">
            <BackgroundGridPattern />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
