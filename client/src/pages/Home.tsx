import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { AnimatePresence, motion } from "motion/react"
import { useQuery } from "@tanstack/react-query"

import { Alert, Modal, SnackbarAlert, StaggerList, ThemeToggle } from "../ui"
import {
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
import { type Question, QuestionCategories, QuestionType } from "../constants/types"
import { useState, type ChangeEvent } from "react"
import AnimatedAmqLogo from "../assets/icons/AnimatedAmqLogo"
import { getRandomizedArray, isQuestionType, fetchQuestions } from "../utils"
import { ROUTES } from "../constants/routes"

const QuestionCategoryLabelMap = {
  [QuestionCategories.Love]: "💗 Love 💗",
  [QuestionCategories.Bollywood]: "🕺 Bollywood 💃",
  [QuestionCategories.Brains]: "Shower thoughts 🧠",
  [QuestionCategories.Opinions]: "Hot takes and Unpopular Opinions 🔥",
  [QuestionCategories.Nostalgia]: "Nostalgia 🌟",
}

export default function Home() {
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

  const navigate = useNavigate()

  const {
    isPending: isCategoryQuestionsPending,
    data: categoryQuestionsData,
    isError: isCategoryQuestionsError,
  } = useQuery<Record<QuestionCategories, Question[]>>({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
    staleTime: Infinity,
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
      navigate(ROUTES.questionnaire)
    } else {
      // question format selected is a question type
      if (isQuestionType(nextQuestionsFormat)) {
        dispatch(clearCategory())
        if (nextQuestionsFormat !== selectedQuestionType) {
          dispatch(changeQuestionNumber(0))
          dispatch(replaceQuestions([]))
          dispatch(changeQuestionType(nextQuestionsFormat))
        }
        navigate(ROUTES.questionnaire)
      }
      // question format selected is question category
      else {
        dispatch(changeQuestionNumber(0))
        if (categoryQuestionsData && !isCategoryQuestionsError) {
          const categoryQuestions = getRandomizedArray(
            categoryQuestionsData[nextQuestionsFormat],
          ).slice(0, noOfCategoryQuestions)
          dispatch(changeQuestionCategory(nextQuestionsFormat))
          dispatch(replaceQuestions(categoryQuestions))
          navigate(ROUTES.questionnaire)
        }
      }
    }
  }

  const isDiscardingPrevQuestions =
    hasSavedQuestions &&
    !selectedQuestionCategory &&
    nextQuestionsFormat &&
    nextQuestionsFormat !== selectedQuestionType

  const isCategoryQuestionSelected = nextQuestionsFormat && !isQuestionType(nextQuestionsFormat)

  return (
    <>
      <SnackbarAlert searchParam="invalidated" searchParamValue="true" type="warning">
        You don't have any saved questions to access this page.
      </SnackbarAlert>
      <SnackbarAlert searchParam="error" searchParamValue="true" type="danger">
        Something went wrong, please try again later.
      </SnackbarAlert>
      <SnackbarAlert searchParam="expired" searchParamValue="true" type="warning">
        This session no longer exists. But feel free to create a new one :)
      </SnackbarAlert>
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
          <button onClick={() => navigate(ROUTES.issues)}>Help us improve</button>
        </div>
        <ThemeToggle />
      </footer>
      <Modal isOpen={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
        <AnimatePresence>
          {isCategoryQuestionSelected && isCategoryQuestionsPending && (
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="mb-32"
            >
              <Alert type="warning">Loading category questions in background.</Alert>
            </motion.div>
          )}
        </AnimatePresence>
        {isCategoryQuestionSelected && isCategoryQuestionsError && (
          <div className="mb-32">
            <Alert type="danger">
              Unable to fetch category questions at the moment. Please try again later.
            </Alert>
          </div>
        )}
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
        {isCategoryQuestionSelected && (
          <div className="confirmation-dialog-input-wrapper">
            <label htmlFor="no-of-category-questions">
              How many questions would you like to go for this category?
            </label>
            <input
              type="number"
              name="no-of-category-questions"
              id="no-of-category-questions"
              min={1}
              max={categoryQuestionsData?.[nextQuestionsFormat]?.length}
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
        <button
          onClick={handleQuestionTypeOrCategoryConfirm}
          disabled={
            isCategoryQuestionSelected && (isCategoryQuestionsPending || isCategoryQuestionsError)
          }
        >
          {isDiscardingPrevQuestions ? "Yes, that's fine" : "Let's go"}
        </button>
      </Modal>
    </>
  )
}
