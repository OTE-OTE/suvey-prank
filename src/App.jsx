import { useState, useMemo } from 'react'
import { supabase } from './supabase'
import './App.css'

const CORRECT = '陈正宇'

function App() {
  const [answer1, setAnswer1] = useState('')
  const [answer2, setAnswer2] = useState('')
  const [prankStep, setPrankStep] = useState(0)
  const [prankAnswer, setPrankAnswer] = useState('')
  const [finalName, setFinalName] = useState('')
  const [phase, setPhase] = useState('q1')
  const [done, setDone] = useState(false)

  // 99个整蛊题
  const prankQuestions = useMemo(() => {
    const list = [{ text: '是不是不识相？谁是最帅的男人？（提示：陈正宇）' }]
    for (let i = 0; i < 97; i++) {
      list.push({ text: '谁是最帅的男人？' })
    }
    list.push({ text: '好好好，算你牛！', isFinal: true })
    return list
  }, [])

  const submit = async () => {
    await supabase.from('调查答案').insert({
      answer1,
      answer2: answer2 || '',
      name: finalName
    })
    setDone(true)
  }

  const handleQ1 = () => {
    if (answer1.trim() === CORRECT) {
      setPhase('final')
    } else {
      setPhase('q2')
    }
  }

  const handleQ2 = () => {
    if (answer2.trim() === CORRECT) {
      setPhase('final')
    } else {
      setPhase('prank')
    }
  }

  const handlePrankNext = () => {
    if (prankAnswer.trim() === CORRECT) {
      setPhase('final')
    } else {
      if (prankStep < 98) {
        setPrankStep(prankStep + 1)
        setPrankAnswer('')
      } else {
        setPrankStep(prankStep + 1)
      }
    }
  }

  const handleFinal = () => {
    if (finalName.trim()) submit()
  }

  if (done) {
    return (
      <div className="container">
        <h1>✅ 提交成功</h1>
        <p>有眼光！</p>
      </div>
    )
  }

  // 问题1
  if (phase === 'q1') {
    return (
      <div className="container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '5%' }} />
        </div>
        <p className="progress-text">问题 1/3</p>
        <h2>谁是最帅的男人？</h2>
        <input className="answer-input" value={answer1} onChange={(e) => setAnswer1(e.target.value)} placeholder="请输入你的回答" autoFocus />
        <button onClick={handleQ1}>下一题 →</button>
      </div>
    )
  }

  // 问题2
  if (phase === 'q2') {
    return (
      <div className="container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '10%' }} />
        </div>
        <p className="progress-text">问题 2/3</p>
        <h2>谁是最帅的男人？（提示：陈正宇）</h2>
        <input className="answer-input" value={answer2} onChange={(e) => setAnswer2(e.target.value)} placeholder="请输入你的回答" autoFocus />
        <button onClick={handleQ2}>下一题 →</button>
      </div>
    )
  }

  // 整蛊循环
  if (phase === 'prank') {
    if (prankStep >= 99) {
      return (
        <div className="container">
          <h2>🎉 好好好，算你牛！</h2>
          <p>你居然真的答完了 99 题...</p>
          <p>敬你是条汉子！</p>
        </div>
      )
    }
    const q = prankQuestions[prankStep]

    if (q.isFinal) {
      return (
        <div className="container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '100%' }} />
          </div>
          <p className="progress-text">整蛊 99/99</p>
          <h2>好好好，算你牛！</h2>
          <p style={{ fontSize: 14, marginTop: 8 }}>真有人能坚持到这？佩服佩服 👏</p>
          <button onClick={() => setPhase('final')}>行吧，你赢了 →</button>
        </div>
      )
    }

    return (
      <div className="container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '50%' }} />
        </div>
        <p className="progress-text">整蛊 {prankStep + 1}/99</p>
        <h2>{q.text}</h2>
        <input className="answer-input" value={prankAnswer} onChange={(e) => setPrankAnswer(e.target.value)} placeholder="请输入你的回答" autoFocus />
        <button onClick={handlePrankNext}>下一题 →</button>
      </div>
    )
  }

  // 最后问题
  if (phase === 'final') {
    return (
      <div className="container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '100%' }} />
        </div>
        <p className="progress-text">最后一步</p>
        <h2>有眼光兄弟！你的名字是？</h2>
        <input className="answer-input" value={finalName} onChange={(e) => setFinalName(e.target.value)} placeholder="请输入你的名字" autoFocus />
        <button onClick={handleFinal}>提交</button>
      </div>
    )
  }

  return null
}

export default App
