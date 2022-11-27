import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Space, Modal, message} from "antd";


interface question {
    problemDescription?: string,
    choice?: Map<string, string>,
    score?: Map<string, number>
}

interface QuestionSet {
    problems?: question[],
    result?: Map<string, string>
}

export interface ApiResponse<T> {
    message: string,
    data: T
}

export default function QuestionSet() {
    // 存储用户答案
    const [userAnswer, setUserAnswer] = useState<Map<number, number>>(new Map<number, number>)
    // 查看评测结果
    const [userResult, setUserResult] = useState<string>()
    const [problemElement, setProblemElement] = useState<any>([])
    const [questionSet, setQuestionSet] = useState<QuestionSet>()


    const [messageApi, contextHolder] = message.useMessage();

    function handleChange(index: any, score: any) {
        userAnswer?.set(index, score);
        setUserAnswer(userAnswer)
    }

    useEffect(() => {
        axios.get<QuestionSet>("static/data/problem.json").then((res) => {
            let questionSet: QuestionSet = res.data;
            let problemEle = []
            for (let i = 0; (questionSet.problems) && (i < questionSet.problems.length); i += 1) {
                // let tpquestion: question = questionSet.problems[i];
                let tpArr: any = []
                questionSet.problems[i].choice = new Map(Object.entries(questionSet.problems[i].choice!))
                questionSet.problems[i].score = new Map(Object.entries(questionSet.problems[i].score!))
                questionSet.problems[i].choice?.forEach((value, key) => {

                    tpArr.push(<label> <input type="radio" name={'question' + i} value={key} key={key + i}
                                              onChange={() => {
                                                  // @ts-ignore
                                                  handleChange(i, questionSet.problems[i].score?.get(key))
                                              }}/>{key + ": " + value}
                    </label>)
                })
                problemEle.push(
                    <div key={i}>
                        <p>{questionSet.problems[i].problemDescription}</p>
                        {tpArr}
                    </div>
                )
            }
            setQuestionSet(questionSet)
            setProblemElement(problemEle)
        })
    }, [])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        if ((userAnswer?.size) < problemElement?.length) {
            console.log("error")
            messageApi.open({
                type: 'error',
                content: '请做完全部题目',
            });
            return
        }
        let sum: number = 0
        userAnswer.forEach(value => {
            sum = sum + value
        })
        let result: string = ""

        let tpMap = new Map(Object.entries(questionSet?.result!))
        tpMap.forEach((value, key) => {
            if (sum >= Number(key)) {
                result = value
            }
        })
        setIsModalOpen(true);
        setUserResult(result)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {problemElement}
            <Button type="primary" onClick={showModal}>
                查看结果
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {userResult}
            </Modal>
        </div>
    )
}
