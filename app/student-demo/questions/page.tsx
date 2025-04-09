"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

export default function QuestionsPool() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState<Record<number, boolean>>({})

  const questions: Question[] = [
    {
      id: 1,
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Process Utility", "Core Processing Unit"],
      correctAnswer: 0,
      explanation:
        "CPU stands for Central Processing Unit. It's the primary component of a computer that performs most of the processing inside a computer.",
      category: "Hardware",
    },
    {
      id: 2,
      question: "Which of the following is NOT an operating system?",
      options: ["Windows", "Linux", "Oracle", "macOS"],
      correctAnswer: 2,
      explanation:
        "Oracle is a database management system, not an operating system. Windows, Linux, and macOS are all operating systems.",
      category: "Software",
    },
    {
      id: 3,
      question: "What is the function of RAM in a computer?",
      options: [
        "To permanently store data",
        "To temporarily store data that the CPU is actively using",
        "To increase the computer's internet speed",
        "To cool down the processor",
      ],
      correctAnswer: 1,
      explanation:
        "RAM (Random Access Memory) temporarily stores data that the CPU is actively using, allowing for quick access to the data.",
      category: "Hardware",
    },
    {
      id: 4,
      question: "What does URL stand for?",
      options: [
        "Universal Resource Locator",
        "Uniform Resource Locator",
        "Universal Reference Link",
        "Uniform Reference Locator",
      ],
      correctAnswer: 1,
      explanation:
        "URL stands for Uniform Resource Locator. It's the address of a specific webpage or file on the Internet.",
      category: "Internet",
    },
    {
      id: 5,
      question: "Which of the following is an example of an input device?",
      options: ["Monitor", "Printer", "Keyboard", "Speakers"],
      correctAnswer: 2,
      explanation:
        "A keyboard is an input device used to enter data into a computer. Monitors, printers, and speakers are output devices.",
      category: "Hardware",
    },
    {
      id: 6,
      question: "What is the purpose of a firewall in computer security?",
      options: [
        "To prevent physical damage to the computer",
        "To monitor and control incoming and outgoing network traffic",
        "To increase the computer's processing speed",
        "To back up important files",
      ],
      correctAnswer: 1,
      explanation:
        "A firewall monitors and controls incoming and outgoing network traffic based on predetermined security rules, helping to protect your computer from unauthorized access.",
      category: "Security",
    },
    {
      id: 7,
      question: "Which file extension is commonly used for compressed files?",
      options: [".doc", ".exe", ".jpg", ".zip"],
      correctAnswer: 3,
      explanation:
        ".zip is a common file extension for compressed files. .doc is for Word documents, .exe is for executable programs, and .jpg is for image files.",
      category: "Software",
    },
    {
      id: 8,
      question: "What is the main function of an SSD in a computer?",
      options: ["To process data", "To store data permanently", "To connect to the internet", "To display graphics"],
      correctAnswer: 1,
      explanation:
        "An SSD (Solid State Drive) is used to store data permanently. Unlike RAM, data on an SSD remains even when the computer is turned off.",
      category: "Hardware",
    },
    {
      id: 9,
      question: "Which of the following is NOT a web browser?",
      options: ["Chrome", "Excel", "Firefox", "Safari"],
      correctAnswer: 1,
      explanation:
        "Excel is a spreadsheet program, not a web browser. Chrome, Firefox, and Safari are all web browsers used to access the internet.",
      category: "Software",
    },
    {
      id: 10,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: 0,
      explanation:
        "HTML stands for Hyper Text Markup Language. It's the standard markup language for creating web pages and web applications.",
      category: "Internet",
    },
  ]

  const categories = [...new Set(questions.map((q) => q.category))]

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    })
  }

  const checkAnswer = (questionId: number) => {
    setShowResults({
      ...showResults,
      [questionId]: true,
    })
  }

  const resetQuestion = (questionId: number) => {
    const newSelectedAnswers = { ...selectedAnswers }
    delete newSelectedAnswers[questionId]

    const newShowResults = { ...showResults }
    delete newShowResults[questionId]

    setSelectedAnswers(newSelectedAnswers)
    setShowResults(newShowResults)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/student-demo" className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-emerald-600"
                >
                  <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z" />
                  <path d="M15 9h-6v6h6V9Z" />
                </svg>
                <span className="text-xl font-bold">EduTrack</span>
              </Link>

              <nav className="ml-10 flex items-center space-x-4">
                <Link href="/student-demo" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  Dashboard
                </Link>
                <Link href="/student-demo/questions" className="text-sm font-medium text-emerald-600">
                  Questions Pool
                </Link>
                <Link href="/student-demo" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  History
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-gray-500">Signed in as </span>
                <span className="font-medium text-gray-900">Jane Doe</span>
              </div>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Exam Questions Pool</h1>
            <p className="text-gray-500">Practice with sample questions about general PC knowledge</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Questions</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  selectedAnswer={selectedAnswers[question.id]}
                  showResult={showResults[question.id]}
                  onAnswerSelect={handleAnswerSelect}
                  onCheck={() => checkAnswer(question.id)}
                  onReset={() => resetQuestion(question.id)}
                />
              ))}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-6">
                {questions
                  .filter((q) => q.category === category)
                  .map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      selectedAnswer={selectedAnswers[question.id]}
                      showResult={showResults[question.id]}
                      onAnswerSelect={handleAnswerSelect}
                      onCheck={() => checkAnswer(question.id)}
                      onReset={() => resetQuestion(question.id)}
                    />
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  )
}

interface QuestionCardProps {
  question: Question
  selectedAnswer?: number
  showResult?: boolean
  onAnswerSelect: (questionId: number, answerIndex: number) => void
  onCheck: () => void
  onReset: () => void
}

function QuestionCard({ question, selectedAnswer, showResult, onAnswerSelect, onCheck, onReset }: QuestionCardProps) {
  const isCorrect = selectedAnswer === question.correctAnswer

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Question {question.id}</CardTitle>
            <CardDescription>Category: {question.category}</CardDescription>
          </div>
          {showResult && (
            <div className={`flex items-center ${isCorrect ? "text-green-600" : "text-red-600"}`}>
              {isCorrect ? <CheckCircle className="mr-1 h-5 w-5" /> : <XCircle className="mr-1 h-5 w-5" />}
              <span>{isCorrect ? "Correct" : "Incorrect"}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{question.question}</p>

        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => onAnswerSelect(question.id, Number.parseInt(value))}
          disabled={showResult}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`q${question.id}-option${index}`} />
              <Label
                htmlFor={`q${question.id}-option${index}`}
                className={
                  showResult && index === question.correctAnswer
                    ? "text-green-600 font-medium"
                    : showResult && index === selectedAnswer
                      ? "text-red-600"
                      : ""
                }
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showResult && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="font-medium">Explanation:</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        {showResult ? (
          <Button variant="outline" onClick={onReset}>
            Try Again
          </Button>
        ) : (
          <Button
            onClick={onCheck}
            disabled={selectedAnswer === undefined}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Check Answer
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
