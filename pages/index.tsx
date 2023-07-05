import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  BackgroundGridPattern,
  PageLayout,
} from "@/components/Layouts"

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
            <motion.div initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}>
                <h3 className="p-5 font-aboreto text-6xl font-semibold">Generative AI for customer support</h3>
                <p className="p-5 text-xl">Meet <span className="font-bold">Infernix AI</span> helping support teams easily cut costs while providing top-tier service in every customer interaction.</p>
              </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 -z-10 overflow-hidden ">
            <BackgroundGridPattern />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
