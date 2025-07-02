"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import quotesData from "@/data/quotes.json"

const formSchema = z.object({
  topic: z.string().min(1, "Please enter a topic"),
})

type Quote = string

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  })

  const getRandomQuotes = (topicQuotes: Quote[]): Quote[] => {
    const shuffled = [...topicQuotes].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 3)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const topic = values.topic.toLowerCase()
    let selectedQuotes: Quote[] = []

    // Check if the topic exists in our data
    if (topic in quotesData) {
      selectedQuotes = getRandomQuotes(quotesData[topic as keyof typeof quotesData])
    } else {
      // If topic doesn't exist, mix quotes from all categories
      const allQuotes = Object.values(quotesData).flat()
      selectedQuotes = getRandomQuotes(allQuotes)
    }

    setQuotes(selectedQuotes)
    setIsLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Quote Generator</h1>
        <p className="text-lg text-gray-600">
          Enter a topic and get 3 inspiring motivational quotes
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {Object.keys(quotesData).map((topic) => (
            <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-gray-200" 
                   onClick={() => form.setValue('topic', topic)}>
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Generate Quotes</CardTitle>
          <CardDescription>
            Try topics like: motivation, success, dreams, leadership, confidence, happiness, wisdom, change, failure, growth, creativity, perseverance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter a topic..." 
                        {...field} 
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Quotes"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {quotes.length > 0 && (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Found {quotes.length} motivational quotes for your topic! Click on any topic badge above to try different categories.
            </AlertDescription>
          </Alert>
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Your Motivational Quotes
          </h2>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            {quotes.map((quote, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                    "{quote.split(' - ')[0]}"
                  </blockquote>
                  {quote.includes(' - ') && (
                    <cite className="block mt-4 text-sm font-medium text-gray-500">
                      — {quote.split(' - ')[1]}
                    </cite>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}