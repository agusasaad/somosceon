'use client'
import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Plus from '@/assets/icons/Plus'
import styles from './SectionSix.module.css'
import { faqs } from './data'
import { animateSectionSix } from './AnimateSectionSix'

const SectionSix = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const faqRefs = useRef([])
  const iconRefs = useRef([])

  const title = useRef(null)
  const image = useRef(null)
  const preguntas = useRef(null)

  useEffect(() => {
    animateSectionSix(image.current, title.current, preguntas.current)
  }, [])

  const handleToggle = (index) => {
    const isOpen = openIndex === index

    if (isOpen) {
      const element = faqRefs.current[index]
      gsap.to(element, {
        height: 0,
        duration: 0.5,
        ease: 'power1',
        onComplete: () => {
          setOpenIndex(null)
        },
      })
      gsap.to(iconRefs.current[index], {
        rotate: 0,
        duration: 0.5,
        ease: 'power1',
      })
    } else {
      if (openIndex !== null) {
        const previousElement = faqRefs.current[openIndex]
        gsap.to(previousElement, {
          height: 0,
          duration: 0.5,
          ease: 'power1',
        })
        gsap.to(iconRefs.current[openIndex], {
          rotate: 0,
          duration: 0.5,
          ease: 'power1',
        })
      }

      // Abre la nueva FAQ
      const element = faqRefs.current[index]
      setOpenIndex(index)
      gsap.fromTo(
        element,
        { height: 0 },
        { height: 'auto', duration: 0.5, ease: 'power1' }
      )
      gsap.to(iconRefs.current[index], {
        rotate: 45,
        duration: 0.5,
        ease: 'power1',
      })
    }
  }

  return (
    <section className={styles.container} id='section_six'>
      <div className={styles.content}>
        <div className={styles.titles}>
          <h2 ref={title}>Preguntas frecuentes</h2>
        </div>
        <div className={styles.faq} ref={preguntas}>
          {faqs.map((faq, index) => (
            <div
              className={`${styles.question}`}
              key={index}
              onClick={() => handleToggle(index)}
            >
              <div className={styles.title_button}>
                <h3>{faq.question}</h3>
                <button>
                  <div
                    ref={(el) => (iconRefs.current[index] = el)}
                    style={{ display: 'inline-block' }}
                  >
                    <Plus />
                  </div>
                </button>
              </div>
              <div
                className={styles.answer}
                ref={(el) => (faqRefs.current[index] = el)}
                style={{
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.image} ref={image}></div>
    </section>
  )
}

export default SectionSix
