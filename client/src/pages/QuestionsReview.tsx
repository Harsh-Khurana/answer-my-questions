import { useDispatch, useSelector } from "react-redux"
import { Fragment, useEffect, useState } from "react"
import { DragDropProvider, DragOverlay, type DragEndEvent, PointerSensor } from "@dnd-kit/react"
import { PointerActivationConstraints } from "@dnd-kit/dom"
import { RestrictToWindow } from "@dnd-kit/dom/modifiers"
import { move } from "@dnd-kit/helpers"
import { AnimatePresence } from "motion/react"
import { useNavigate, useSearchParams } from "react-router"
import { useMutation, useQuery } from "@tanstack/react-query"

import { SixDotsIcon } from "../assets/icons"
import { Alert, BackBtn, Copier, Modal } from "../ui"
import { ReviewQuestionCard, SortableQuestionRow } from "../components"
import { QuestionType, type Sessions } from "../constants/types"
import {
  changeQuestionNumber,
  changeQuestionType,
  replaceAnswers,
  replaceQuestions,
  selectIsAnsweringMandatory,
  selectQuestions,
  type AppDispatch,
} from "../store"
import { ROUTES } from "../constants/routes"
import { createSession, getSession, getSessionStatus } from "../utils"
import { CLIENT_BASE_URL } from "../constants/urls"

export default function QuestionsReview() {
  const questions = useSelector(selectQuestions)
  const isAnsweringMandatory = useSelector(selectIsAnsweringMandatory)

  const dispatch = useDispatch<AppDispatch>()

  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [showNavConfirmationDialog, setShowNavConfirmationDialog] = useState(false)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { isPending, mutate, data, isError, error } = useMutation({
    mutationFn: createSession,
    onSuccess: data => {
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.set("sessionId", data?.sessionId)
      window.history.replaceState({}, "", newUrl)
    },
  })

  const activeSessionId = data?.sessionId || searchParams.get("sessionId")
  const isSessionCreatedSuccessfully = !!activeSessionId

  const { data: sessionStatus, isError: isSessionStatusError } = useQuery<{
    sessionCompleted: boolean
  }>({
    queryKey: ["sessions", "status", activeSessionId],
    queryFn: props => getSessionStatus({ ...props, sessionId: activeSessionId }),
    enabled: isSessionCreatedSuccessfully,
    refetchInterval: 2000,
  })

  const { isSuccess: isSessionSuccess, data: session } = useQuery<Sessions[number]>({
    queryKey: ["sessions", activeSessionId],
    queryFn: props => getSession({ ...props, sessionId: activeSessionId }),
    enabled: !!sessionStatus?.sessionCompleted && isSessionCreatedSuccessfully,
  })

  useEffect(() => {
    if (isSessionSuccess && session) {
      dispatch(replaceAnswers(session.answers))
      navigate(`${ROUTES.results}?sessionId=${activeSessionId}`)
    }
  }, [activeSessionId, dispatch, isSessionSuccess, navigate, session])

  const questionByTypeCount = questions.reduce(
    (acc, question) => {
      acc[question.type]++
      return acc
    },
    {
      [QuestionType.MCQ]: 0,
      [QuestionType.Subjective]: 0,
      [QuestionType.Boolean]: 0,
    },
  )
  const totalQuestions = questions.length

  function handleBackBtnClick() {
    if (isSessionCreatedSuccessfully) {
      setShowNavConfirmationDialog(true)
    } else {
      navigate("/")
    }
  }

  function handleBackConfirmation() {
    dispatch(changeQuestionNumber(0))
    dispatch(changeQuestionType("Mix"))
    dispatch(replaceQuestions([]))
    navigate("/")
  }

  function handleAddMore() {
    navigate(ROUTES.questionnaire)
  }

  function handleDragEnd(event: DragEndEvent) {
    const reorderedQuestions = move(questions, event)
    dispatch(replaceQuestions(reorderedQuestions))
  }

  function handleSubmit() {
    mutate({ questions, isAnsweringMandatory })
  }

  return (
    <>
      <header>
        <BackBtn label="Back to home" onBack={handleBackBtnClick} disabled={isPending} />
        <p>
          <span>
            Total questions: <strong>{totalQuestions}</strong>
          </span>
          {(Object.keys(questionByTypeCount) as QuestionType[]).map(type =>
            questionByTypeCount[type] ? (
              <Fragment key={type}>
                , {type}: <strong>{questionByTypeCount[type]}</strong>
              </Fragment>
            ) : (
              ""
            ),
          )}
        </p>
        {!isSessionCreatedSuccessfully && (
          <div className="flex">
            <button className="mr-8" onClick={handleAddMore} disabled={isPending}>
              Add more questions
            </button>
            <button onClick={() => setShowSubmitDialog(true)} disabled={isPending}>
              {isPending ? "Submitting" : "Submit"} questions
            </button>
          </div>
        )}
        {isSessionCreatedSuccessfully && (
          <button onClick={() => setShowSubmitDialog(true)}>Show status & link</button>
        )}
      </header>
      {isError && (
        <div className="mb-32">
          <Alert type="danger">{error.message}</Alert>
        </div>
      )}
      <Alert>
        <span>
          Review your questions below. <SixDotsIcon height={14} width={10} />
          {!isSessionCreatedSuccessfully ? " Hold & drag to reorder, or" : ""} Click to reveal
          actions.
        </span>
      </Alert>
      <DragDropProvider
        onDragEnd={handleDragEnd}
        sensors={defaults => [
          ...defaults,
          PointerSensor.configure({
            activationConstraints: [
              new PointerActivationConstraints.Distance({ value: 10 }),
              new PointerActivationConstraints.Delay({ value: 500, tolerance: { x: 10, y: 5 } }),
            ],
          }),
        ]}
        modifiers={defaults => [...defaults, RestrictToWindow]}
      >
        <main className="review-questions-list">
          <AnimatePresence>
            {questions.map((question, idx) => (
              <SortableQuestionRow
                key={question.id}
                question={question}
                index={idx}
                isDisabled={isSessionCreatedSuccessfully}
              />
            ))}
          </AnimatePresence>
        </main>
        <DragOverlay dropAnimation={null}>
          {source => {
            const draggedItem = questions.find(q => q.id === source?.id)!
            return <ReviewQuestionCard question={draggedItem} hideActions />
          }}
        </DragOverlay>
      </DragDropProvider>
      <Modal isOpen={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        {!isSessionCreatedSuccessfully && (
          <>
            <p>
              Are you sure you want to submit your questions now. You won't be able to make edits
              after submitting.
            </p>
            <button onClick={handleSubmit} disabled={isPending}>
              {isPending ? <span className="loading-dots">Submitting</span> : "Yes, let's do it"}
            </button>
          </>
        )}
        {isSessionCreatedSuccessfully && (
          <>
            {isSessionStatusError && (
              <div className="mb-32">
                <Alert type="danger">Error checking status of questions :(</Alert>
              </div>
            )}
            <h3>Share this link with the next person who is going to answer your questions</h3>
            <Copier
              textToCopy={`${CLIENT_BASE_URL}/answer-sheet?sessionId=${activeSessionId}`}
              label="Copy Link"
            />
            {!isSessionStatusError && (
              <p className="loading-dots">
                Waiting for the next person to finish answering questions
              </p>
            )}
          </>
        )}
      </Modal>
      <Modal isOpen={showNavConfirmationDialog} onClose={() => setShowNavConfirmationDialog(false)}>
        <h3>Are you sure you want to go back to home page and leave the current session ?</h3>
        <p>If so, you can still check back results later by going to this url.</p>
        {isSessionCreatedSuccessfully && (
          <Copier
            textToCopy={`${CLIENT_BASE_URL}/results?sessionId=${activeSessionId}`}
            label="Copy Link"
          />
        )}
        <button onClick={handleBackConfirmation}>Take me back now</button>
      </Modal>
    </>
  )
}
