import { useDispatch, useSelector } from "react-redux"

import { Modal, StaggerList, ThemeToggle } from "../ui"
import {
  changePage,
  changeQuestionCategory,
  changeQuestionNumber,
  changeQuestionType,
  clearCategory,
  replaceQuestions,
  selectGlobalQuestionCategory,
  selectGlobalQuestionType,
  selectHasSavedQuestions,
  selectIsAnsweringMandatory,
  setIsAnsweringMandatory,
  type AppDispatch,
} from "../store"
import { PageType, QuestionCategories, QuestionType } from "../constants/types"
import { ALL_CATEGORY_QUESTIONS } from "../constants/questions"
import { useState, type ChangeEvent } from "react"
import AnimatedAmqLogo from "../assets/icons/AnimatedAmqLogo"
import { getRandomizedArray } from "../utils"
import { isQuestionType } from "../utils/type-guards"

const QuestionCategoryLabelMap = {
  [QuestionCategories.Love]: "💗 Love 💗",
  [QuestionCategories.Bollywood]: "🕺 Bollywood 💃",
  [QuestionCategories.Brains]: "Shower thoughts 🧠",
  [QuestionCategories.Opinions]: "Hot takes and Unpopular Opinions 🔥",
  [QuestionCategories.Nostalgia]: "Nostalgia 🌟",
}

type HomeProps = {
  onSubmit: () => void
}

export default function Home({ onSubmit }: HomeProps) {
  const hasSavedQuestions = useSelector(selectHasSavedQuestions)
  const selectedQuestionType = useSelector(selectGlobalQuestionType)
  const selectedQuestionCategory = useSelector(selectGlobalQuestionCategory)
  const isAnsweringMandatory = useSelector(selectIsAnsweringMandatory)
  const dispatch = useDispatch<AppDispatch>()

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [nextQuestionsFormat, setNextQuestionsFormat] = useState<
    QuestionType | QuestionCategories | undefined
  >(undefined)
  const [noOfCategoryQuestions, setNoOfCategoryQuestions] = useState(() => {
    try {
      const numberOfCategoryQuestions = localStorage.getItem("numberOfCategoryQuestions")
      return numberOfCategoryQuestions ? +numberOfCategoryQuestions : 10
    } catch {
      return 10
    }
  })

  function handleQuestionFormatClick(format?: QuestionType | QuestionCategories) {
    setNextQuestionsFormat(format)
    setShowConfirmationDialog(true)
  }

  function handleNumberOfCategoryQuestionsChange(e: ChangeEvent<HTMLInputElement>) {
    setNoOfCategoryQuestions(+e.target.value)
    try {
      localStorage.setItem("numberOfCategoryQuestions", e.target.value)
    } catch {
      // localStorage is blocked/broken
    }
  }

  function handleAnswerMandatoryChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(setIsAnsweringMandatory(e.target.checked))
    try {
      localStorage.setItem("isAnsweringMandatory", String(e.target.checked))
    } catch {
      // localStorage is blocked/broken
    }
  }

  function handleQuestionTypeOrCategoryConfirm() {
    // if no question format selected, then it's mix type
    if (!nextQuestionsFormat) {
      // if category questions were selected before then clear them
      if (selectedQuestionCategory) {
        dispatch(changeQuestionNumber(0))
        dispatch(replaceQuestions([]))
        dispatch(clearCategory())
      }
      dispatch(changeQuestionType("Mix"))
      onSubmit()
    } else {
      // question format selected is a question type
      if (isQuestionType(nextQuestionsFormat)) {
        dispatch(clearCategory())
        if (nextQuestionsFormat !== selectedQuestionType) {
          dispatch(changeQuestionNumber(0))
          dispatch(replaceQuestions([]))
          dispatch(changeQuestionType(nextQuestionsFormat))
        }
        onSubmit()
      }
      // question format selected is question category
      else {
        dispatch(changeQuestionNumber(0))
        const categoryQuestions = getRandomizedArray(
          ALL_CATEGORY_QUESTIONS[nextQuestionsFormat],
        ).slice(0, noOfCategoryQuestions)
        dispatch(changeQuestionCategory(nextQuestionsFormat))
        dispatch(replaceQuestions(categoryQuestions))
        onSubmit()
      }
    }
  }

  const isDiscardingPrevQuestions =
    hasSavedQuestions &&
    !selectedQuestionCategory &&
    nextQuestionsFormat &&
    nextQuestionsFormat !== selectedQuestionType

  return (
    <>
      <main className="main-home">
        <AnimatedAmqLogo />
        <h1>Answer My Question</h1>
        <p>
          A simple question and answer game that can be played with anyone, be it your partner,
          friends, or family.
        </p>
        <small>
          Either pick a category of questions that will lead to some lighthearted drama, test
          friendships, and spark some interesting conversations for sure!
        </small>
        <small>Or choose to create your own questions based on type</small>
        <div className="flex question-type-selectors">
          <StaggerList
            label={<button>Choose question category</button>}
            staggerDirectionFrom="left"
          >
            {Object.values(QuestionCategories).map(qc => (
              <button key={qc} onClick={() => handleQuestionFormatClick(qc)}>
                {QuestionCategoryLabelMap[qc]}
              </button>
            ))}
          </StaggerList>
          <StaggerList label={<button>Create your own questions</button>}>
            <button onClick={() => handleQuestionFormatClick(QuestionType.MCQ)}>MCQ</button>
            <button onClick={() => handleQuestionFormatClick(QuestionType.Subjective)}>
              Subjective
            </button>
            <button onClick={() => handleQuestionFormatClick(QuestionType.Boolean)}>
              Yes or no
            </button>
            <button onClick={() => handleQuestionFormatClick()}>Mix</button>
          </StaggerList>
        </div>
      </main>
      <footer>
        <div className="help">
          <button>Help us with more questions</button>
          <button onClick={() => dispatch(changePage(PageType.ReportIssues))}>
            Help us improve
          </button>
        </div>
        <ThemeToggle />
      </footer>
      <Modal isOpen={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
        <div className="confirmation-dialog-input-wrapper">
          <label htmlFor="answer-mandatory">Should answering the questions be mandatory?</label>
          <input
            type="checkbox"
            name="answer-mandatory"
            id="answer-mandatory"
            checked={isAnsweringMandatory}
            onChange={handleAnswerMandatoryChange}
          />
        </div>
        {nextQuestionsFormat && !isQuestionType(nextQuestionsFormat) && (
          <div className="confirmation-dialog-input-wrapper">
            <label htmlFor="no-of-category-questions">
              How many questions would you like to go for this category?
            </label>
            <input
              type="number"
              name="no-of-category-questions"
              id="no-of-category-questions"
              min={1}
              max={ALL_CATEGORY_QUESTIONS[nextQuestionsFormat]?.length}
              step={5}
              value={noOfCategoryQuestions}
              onChange={handleNumberOfCategoryQuestionsChange}
            />
          </div>
        )}
        {isDiscardingPrevQuestions && (
          <p>
            Are you sure you want to change question type? Your current saved questions will be
            lost!
          </p>
        )}
        <button onClick={handleQuestionTypeOrCategoryConfirm}>
          {isDiscardingPrevQuestions ? "Yes, that's fine" : "Let's go"}
        </button>
      </Modal>
    </>
  )
}
