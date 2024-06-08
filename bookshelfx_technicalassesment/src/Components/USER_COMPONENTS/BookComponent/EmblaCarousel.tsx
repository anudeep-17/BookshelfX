
import React, { useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { Box, Rating, Typography } from '@mui/material'
import { BookReview } from '@/Components/interfaceModels'

type PropType = {
  slides: BookReview[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }) // Changed playOnInit to true
  ])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay as any;
    if (!autoplay) return

    autoplay.play()  
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
        {slides.length > 0 ? (
          slides.map((slide, index) => (
              <div className="embla__slide" key={index}>
                  <div className="embla__slide__number">
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Rating value={slide.rating} readOnly/>
                        <Typography variant="body1" sx={{
                          textAlign: 'center',
                          textOverflow: 'ellipsis',
                          mt:2
                        }}>
                            &quot;{slide.review}&quot;
                        </Typography>
                      </Box>
                      
                  </div>
              </div>
                ))
          ) : (
              <div className="embla__slide">
                <div className="embla__slide__number">
                    <Typography variant="body1">
                      &quot;No Reviews Available at the moment, may be you will like it. Read and review it.&quot;
                    </Typography>
                </div>
              </div>
          )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel