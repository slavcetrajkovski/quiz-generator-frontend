import { Header } from '@/app/(auth)/_components/header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react'

interface QuizWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerText: string;
}

const QuizWrapper = ({ children, headerLabel, headerText }: QuizWrapperProps) => {
  return (
    <Card className="w-[700px] shadow-md">
    <CardHeader>
      <Header text={headerText} label={headerLabel} />
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
  )
}

export default QuizWrapper