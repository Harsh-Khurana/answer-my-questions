import { useDispatch, useSelector } from "react-redux"

import { Modal, StaggerList } from "../ui"
import {
  changeQuestionCategory,
  changeQuestionNumber,
  changeQuestionType,
  clearCategory,
  replaceQuestions,
  selectGlobalQuestionCategory,
  selectGlobalQuestionType,
  selectHasSavedQuestions,
  type AppDispatch,
} from "../store"
import { QuestionCategories, QuestionType } from "../types"
import { ALL_CATEGORY_QUESTIONS } from "../constants/questions"
import { useRef, useState } from "react"

type HomeProps = {
  onSubmit: () => void
}

export default function Home({ onSubmit }: HomeProps) {
  const hasSavedQuestions = useSelector(selectHasSavedQuestions)
  const selectedQuestionType = useSelector(selectGlobalQuestionType)
  const selectedQuestionCategory = useSelector(selectGlobalQuestionCategory)
  const dispatch = useDispatch<AppDispatch>()

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const nextQuestionTypeRef = useRef<QuestionType | undefined>(undefined)
  const nextQuestionCategoryRef = useRef<QuestionCategories | undefined>(undefined)

  // handleCreateQuestions considers if something was selected in past and now user is reselecting again
  function handleCreateQuestions(type?: QuestionType) {
    let requiresConfirmation = hasSavedQuestions
    // if some category was selected in past
    if (selectedQuestionCategory) {
      dispatch(clearCategory())
      dispatch(replaceQuestions([]))
      requiresConfirmation = false
    }
    // if no type supplied then it's MIX type
    if (!type) {
      dispatch(changeQuestionType("Mix"))
      onSubmit()
    } else {
      if (requiresConfirmation && selectedQuestionType !== type) {
        nextQuestionTypeRef.current = type
        setShowConfirmationDialog(true)
      } else {
        dispatch(changeQuestionType(type))
        onSubmit()
      }
    }
  }

  function handleCategoryClick(category: QuestionCategories) {
    if (hasSavedQuestions && !selectedQuestionCategory) {
      nextQuestionCategoryRef.current = category
      setShowConfirmationDialog(true)
    } else {
      const categoryQuestions = ALL_CATEGORY_QUESTIONS[category]
      dispatch(changeQuestionCategory(category))
      dispatch(replaceQuestions(categoryQuestions))
      onSubmit()
    }
  }

  function handleQuestionTypeOrCategoryConfirm() {
    dispatch(changeQuestionNumber(0))
    if (nextQuestionTypeRef.current) {
      dispatch(replaceQuestions([]))
      dispatch(changeQuestionType(nextQuestionTypeRef.current))
    }
    if (nextQuestionCategoryRef.current) {
      const categoryQuestions = ALL_CATEGORY_QUESTIONS[nextQuestionCategoryRef.current]
      dispatch(replaceQuestions(categoryQuestions))
      dispatch(changeQuestionCategory(nextQuestionCategoryRef.current))
    }
    onSubmit()
    nextQuestionTypeRef.current = undefined
    nextQuestionCategoryRef.current = undefined
  }

  return (
    <>
      <main className="main-home">
        <h1>Answer my questions</h1>
        <p>
          A simple question and answer game that can be played with anyone be it your partner,
          friends, or family.
        </p>
        <div className="flex">
          <StaggerList label={<button>Choose question category</button>}>
            {Object.values(QuestionCategories).map(qc => (
              <button key={qc} onClick={() => handleCategoryClick(qc)}>
                {qc === QuestionCategories.Opinions ? "Hot takes and Unpopular Opinions" : qc}
              </button>
            ))}
          </StaggerList>
          <StaggerList label={<button>Create your own questions</button>}>
            {Object.values(QuestionType).map(qt => (
              <button key={qt} onClick={() => handleCreateQuestions(qt)}>
                {qt === QuestionType.Boolean ? "Yes or No" : qt}
              </button>
            ))}
            <button onClick={() => handleCreateQuestions()}>Mix</button>
          </StaggerList>
        </div>
      </main>
      <Modal isOpen={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
        <p>
          Are you sure you want to change question type? Your current saved questions will be lost.
        </p>
        <button onClick={handleQuestionTypeOrCategoryConfirm}>Yes, that's fine</button>
      </Modal>
    </>
  )
}
