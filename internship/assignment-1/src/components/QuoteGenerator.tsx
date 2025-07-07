"use client" // Enable client-side rendering for interactivity

import { useState } from "react" // State management for dynamic UI
import { useForm } from "react-hook-form" // Form handling library
import { zodResolver } from "@hookform/resolvers/zod" // Validation with Zod
import * as z from "zod" // Schema validation
import { Button } from "@/components/ui/button" // UI button component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" // Card components
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form" // Form components
import { Input } from "@/components/ui/input" // Input field component
import { Badge } from "@/components/ui/badge" // Badge component
import { Alert, AlertDescription } from "@/components/ui/alert" // Alert component
import quotesData from "@/data/quotes.json" // Import quote data
import Head from "next/head" // Metadata and styles (optional, consider moving to globals.css)
import { Toaster, toast } from "react-hot-toast" // Toast notification library

const formSchema = z.object({ // Define validation schema for form
  topic: z.string().min(1, "Please enter a topic"),
})

type Quote = string // Type definition for quotes

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState<Quote[]>([]) // State to store generated quotes
  const [isLoading, setIsLoading] = useState(false) // Loading state for submission
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0) // Current quote index
  const [selectedTopic, setSelectedTopic] = useState<string>("") // Selected topic state

  const form = useForm<z.infer<typeof formSchema>>({ // Initialize form with validation
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "" },
  })

  const getRandomQuotes = (topicQuotes: Quote[]): Quote[] => { // Function to shuffle quotes randomly
    const shuffled = [...topicQuotes].sort(() => 0.5 - Math.random())
    return shuffled
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => { // Handle form submission
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
    const topic = values.topic.toLowerCase()
    let selectedQuotes: Quote[] = []

    try {
      if (topic in quotesData) {
        selectedQuotes = getRandomQuotes(quotesData[topic as keyof typeof quotesData])
      } else {
        const allQuotes = Object.values(quotesData).flat()
        selectedQuotes = getRandomQuotes(allQuotes)
      }
      setQuotes(selectedQuotes)
      setCurrentQuoteIndex(0)
      setSelectedTopic(topic)
      toast.success(`Generated ${selectedQuotes.length} quotes for "${topic}"!`, { duration: 3000 })
    } catch (error) {
      toast.error("Failed to generate quotes. Please try again.", { duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => { // Copy quote to clipboard
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", { duration: 2000 })
    }).catch(() => {
      toast.error("Failed to copy. Please try again.", { duration: 2000 })
    })
  }

  const handleNextQuote = () => { // Move to next quote in the list
    if (quotes.length > 1) {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }
  }

  const handleTopicClick = (topic: string) => { // Handle click on topic badge
    form.setValue('topic', topic)
    setSelectedTopic(topic)
  }

  const getTopicBadgeStyle = (topic: string) => { // Dynamic styling for topic badges
    const isSelected = selectedTopic === topic.toLowerCase()
    const colors = {
      'motivation': isSelected ? 'bg-gradient-to-r from-amber-600 to-orange-600 border-amber-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-amber-600/70 hover:to-orange-600/70 border-amber-500/40',
      'success': isSelected ? 'bg-gradient-to-r from-emerald-600 to-green-600 border-emerald-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-emerald-600/70 hover:to-green-600/70 border-emerald-500/40',
      'perseverance': isSelected ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-blue-600/70 hover:to-indigo-600/70 border-blue-500/40',
      'dreams': isSelected ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-purple-600/70 hover:to-pink-600/70 border-purple-500/40',
      'leadership': isSelected ? 'bg-gradient-to-r from-red-600 to-rose-600 border-red-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-red-600/70 hover:to-rose-600/70 border-red-500/40',
      'confidence': isSelected ? 'bg-gradient-to-r from-yellow-600 to-amber-600 border-yellow-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-yellow-600/70 hover:to-amber-600/70 border-yellow-500/40',
      'happiness': isSelected ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-pink-600/70 hover:to-rose-600/70 border-pink-500/40',
      'wisdom': isSelected ? 'bg-gradient-to-r from-slate-600 to-gray-600 border-slate-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-slate-600/70 hover:to-gray-600/70 border-slate-500/40',
      'change': isSelected ? 'bg-gradient-to-r from-teal-600 to-cyan-600 border-teal-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-teal-600/70 hover:to-cyan-600/70 border-teal-500/40',
      'failure': isSelected ? 'bg-gradient-to-r from-orange-600 to-red-600 border-orange-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-orange-600/70 hover:to-red-600/70 border-orange-500/40',
      'growth': isSelected ? 'bg-gradient-to-r from-lime-600 to-green-600 border-lime-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-lime-600/70 hover:to-green-600/70 border-lime-500/40',
      'creativity': isSelected ? 'bg-gradient-to-r from-violet-600 to-purple-600 border-violet-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-violet-600/70 hover:to-purple-600/70 border-violet-500/40',
      'love': isSelected ? 'bg-gradient-to-r from-rose-600 to-pink-600 border-rose-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-rose-600/70 hover:to-pink-600/70 border-rose-500/40',
      'romance': isSelected ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-pink-600/70 hover:to-rose-600/70 border-pink-500/40',
      'health': isSelected ? 'bg-gradient-to-r from-green-600 to-emerald-600 border-green-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-green-600/70 hover:to-emerald-600/70 border-green-500/40',
      'parents': isSelected ? 'bg-gradient-to-r from-indigo-600 to-blue-600 border-indigo-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-indigo-600/70 hover:to-blue-600/70 border-indigo-500/40',
      'education': isSelected ? 'bg-gradient-to-r from-blue-600 to-cyan-600 border-blue-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-blue-600/70 hover:to-cyan-600/70 border-blue-500/40',
      'adulthood': isSelected ? 'bg-gradient-to-r from-gray-600 to-slate-600 border-gray-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-gray-600/70 hover:to-slate-600/70 border-gray-500/40',
      'heartbreak': isSelected ? 'bg-gradient-to-r from-red-600 to-pink-600 border-red-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-red-600/70 hover:to-pink-600/70 border-red-500/40',
      'death': isSelected ? 'bg-gradient-to-r from-gray-700 to-slate-700 border-gray-500' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-gray-700/70 hover:to-slate-700/70 border-gray-600/40',
      'poverty': isSelected ? 'bg-gradient-to-r from-amber-700 to-orange-700 border-amber-500' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-amber-700/70 hover:to-orange-700/70 border-amber-600/40',
      'childhood': isSelected ? 'bg-gradient-to-r from-sky-600 to-blue-600 border-sky-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-sky-600/70 hover:to-blue-600/70 border-sky-500/40',
    }
    return colors[topic as keyof typeof colors] || (isSelected ? 'bg-gradient-to-r from-cyan-600 to-teal-600 border-cyan-400' : 'bg-gray-800/60 hover:bg-gradient-to-r hover:from-cyan-600/70 hover:to-teal-600/70 border-cyan-500/40')
  }

  return (
    <>
      <Head> // Metadata and font import (consider moving to globals.css)
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"> // Container with static gradient background
        <Toaster position="top-right" /> // Render toast notifications
        <div className="flex flex-col md:flex-row justify-between"> // Layout for topics and main content
          {/* Left Sidebar - Topics */}
          <div className="w-full md:w-80 p-4 rounded-lg"> // Sidebar for topic selection
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> // Grid layout for topic badges
              {Object.keys(quotesData).map((topic) => (
                <Badge 
                  key={topic} 
                  variant="secondary" 
                  className={`cursor-pointer backdrop-blur-sm text-lg font-medium p-3 justify-start block w-full text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${getTopicBadgeStyle(topic)}`} // Styled and interactive badge
                  onClick={() => handleTopicClick(topic)} // Handle badge click
                >
                  {topic} // Display topic name
                </Badge>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-4 md:p-6"> // Main area for form and quotes
            {/* Center Title */}
            <div className="text-center mb-6 md:mb-8"> // Centered title section
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg font-playfair pb-1"> // Gradient title with custom font
                Feeling Thoughtful?
              </h1>
            </div>

            {/* Quote Generator Form */}
            <div className="max-w-md mx-auto mb-6 md:mb-8"> // Form container
              <Card className="shadow-2xl bg-gray-800/40 backdrop-blur-md border-2 border-cyan-500/40 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-xl"> // Styled card for form
                <CardHeader>
                  <CardTitle className="text-3xl text-gray-100 font-playfair"> // Form title
                    Generate Quotes
                  </CardTitle>
                  <CardDescription className="text-2xl text-gray-300 font-playfair"> // Form description
                    What's on your mind...
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...form}> // Form component with validation
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"> // Form submission handler
                      <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-2xl text-gray-100 font-playfair"> // Label for input
                              Topic
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter a topic..."
                                {...field}
                                className="w-full text-[1.4rem] leading-tight py-3 px-5
                                           bg-gray-900/60 border-2 border-cyan-500/40
                                           text-gray-100 placeholder-gray-400
                                           focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20
                                           transition-all duration-300 font-playfair" // Styled input field
                              />
                            </FormControl>
                            <FormMessage className="text-xl text-red-400 font-playfair" /> // Validation error message
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full md:w-auto text-xl
                                   bg-gradient-to-r from-cyan-600 to-teal-600
                                   hover:from-cyan-700 hover:to-teal-700
                                   text-white border-none
                                   transition-all duration-300 transform hover:scale-105
                                   shadow-lg hover:shadow-xl font-playfair" // Styled submit button
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center"> // Loading state
                            <svg
                              className="animate-spin h-5 w-5 mr-3"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Generating...
                          </div>
                        ) : (
                          'Generate Quotes' // Default button text
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Generated Quotes */}
            {quotes.length > 0 && (
              <div className="max-w-4xl mx-auto space-y-6"> // Container for generated quotes
                <Alert className="bg-gradient-to-r from-gray-800/40 to-gray-700/40 backdrop-blur-md border-2 border-cyan-500/40 shadow-lg"> // Styled alert
                  <AlertDescription className="text-lg text-gray-200 font-playfair"> // Alert message
                    Found {quotes.length} motivational quotes for your topic! Click on any topic badge to try different categories.
                  </AlertDescription>
                </Alert>
                
                <h2 className="text-2xl md:text-3xl font-semibold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-md font-playfair"> // Styled title for quotes
                  Your Motivational Quotes
                </h2>
                
                <div className="grid gap-4"> // Grid layout for quote cards
                  {quotes.slice(currentQuoteIndex, currentQuoteIndex + 1).map((quote, index) => (
                    <Card 
                      key={index} 
                      className="hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border-2 border-cyan-500/50 hover:border-cyan-400/70 transform hover:scale-[1.02] hover:-translate-y-1" // Styled and interactive card
                    >
                      <CardContent className="p-4 md:p-8 flex flex-col justify-between relative overflow-hidden"> // Card content with layout
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-xl -translate-y-16 translate-x-16"></div> // Decorative gradient effect
                        <div className="relative z-10">
                          <blockquote className="text-xl md:text-2xl italic leading-relaxed text-gray-100 mb-4 drop-shadow-sm font-playfair"> // Quote text
                            "{quote.split(' - ')[0]}"
                          </blockquote>
                          {quote.includes(' - ') && (
                            <cite className="block text-base font-medium text-cyan-300 drop-shadow-sm font-playfair"> // Author citation
                              — {quote.split(' - ')[1]}
                            </cite>
                          )}
                        </div>
                        <div className="mt-6 flex justify-end gap-3 relative z-10"> // Buttons container
                          <Button 
                            onClick={() => copyToClipboard(quote)} 
                            className="text-base bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-playfair" // Copy button
                          >
                            Copy to Clipboard
                          </Button>
                          <Button 
                            onClick={handleNextQuote} 
                            className="text-base bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-playfair" // Next quote button
                          >
                            Next Quote
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}