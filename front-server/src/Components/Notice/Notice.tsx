import { MouseEventHandler, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { useDeleteFaqMutation, useDeleteNoticeMutation, useGetUserMyinfoQuery, useLazyGetFaqQuery, useLazyGetNoticeQuery, usePostFaqMutation, usePostNoticeMutation, usePutFaqDetailMutation, usePutNoticeDetailMutation, usePutUserBadgeMalrangMutation, useLazyGetUserBadgeQuery} from "../../Store/api";
import Navbar from "../Common/Navbar"
import "./Notice.css";
import { Toast } from "../Common/Toast";
import Loading from "../Common/Loading";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ErrorPage from "../Common/ErrorPage";

function Notice():JSX.Element {
  const userId = localStorage.getItem('userId')
  
  const {data:userMyInfo, isLoading:isLoading1, isError:isError1} = useGetUserMyinfoQuery(userId)
  
  const [choiceBtn, setChoiceBtn] = useState<boolean>(false)
  const error = <ErrorPage/>
  const loading = <Loading/>

  return (
    <>
      {isError1&&error}
      {isLoading1&&loading}
      <Toast/>
      <Navbar/>
      <NoticeSection1 isAdmin={userMyInfo?.data.isAdmin} choiceBtn={choiceBtn} setChoiceBtn={setChoiceBtn} userId={userId}/>
      {
        choiceBtn === false? (
          <NoticeSection3 isAdmin={userMyInfo?.data.isAdmin}/>
        ) :
        <NoticeSection4 isAdmin={userMyInfo?.data.isAdmin}/>
      }
    </>
  )
}
export default Notice

interface BadgeType {
  badgeDetail: string,
  badgeId: number,
  badgeImage: string,
  badgeName: string,
  createdAt: string,
}

function NoticeSection1({isAdmin, choiceBtn, setChoiceBtn, userId}:(boolean|any)):JSX.Element {

  const [putUserBadgeMalrang, {isLoading:isLoading1, isError:isError1}] = usePutUserBadgeMalrangMutation()
  const [getUserBadge, {isLoading:isLoading2, isError:isError2}] = useLazyGetUserBadgeQuery()
  const [mybadgeId, setMybadgeId] = useState<number[]|null>()
  const [easterCnt, setEasterCnt] = useState<number>(0)
  useEffect(()=> {
    
    getUserBadge(userId).unwrap().then((r)=> {
      // console.log(r.data);
      setMybadgeId(r.data.filter((badge:BadgeType)=> {
        return badge.badgeId === 22
      }))
    }).then(()=> {
      if ((!mybadgeId?.length)&&easterCnt===6) {
        putUserBadgeMalrang([userId, 22]).unwrap().then((r)=> {
          if (r.newbadge.length) {
            toast.success('숨겨진 칭호를 획득했습니다!')
          }
        })
      } 
    })
  },[easterCnt])

  const click = () => {
    setEasterCnt(easterCnt+1)
  }
  return (
    <div className="w-full">
      <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto">
        <div className="flex justify-center mb-10">
          <span className="pt-14 text-[1.8rem] md:text-[2rem] text-[#A87E6E] font-bold" onClick={click}>
            알림공간
          </span>
        </div>
      </div>
      <NoticeSection2 isAdmin={isAdmin} choiceBtn={choiceBtn} setChoiceBtn={setChoiceBtn} adminUserId={userId}/>
    </div>
  )
}

function NoticeSection2({isAdmin, choiceBtn, setChoiceBtn, adminUserId}:(boolean|any)):JSX.Element {
  const [postNotice, {isLoading:isLoading1}] = usePostNoticeMutation()
  const [postFaq, {isLoading:isLoading2}] = usePostFaqMutation()

  const [isClickBtn,setIsClickBtn] = useState<boolean>(false)
  const [clickBtn, setClickBtn] = useState<string|null>(null)
  const [isNoticeAdd, setisNoticeAdd] = useState<boolean>(false)
  const [isClickBtn2,setIsClickBtn2] = useState<boolean>(false)
  const [clickBtn2, setClickBtn2] = useState<string|null>(null)
  const [isFaqAdd, setisFaqAdd] = useState<boolean>(false)
  
  const one = useRef<HTMLDivElement>(null) 
  const two = useRef<HTMLDivElement>(null)

  const title = useRef<HTMLInputElement>(null)
  const content= useRef<HTMLTextAreaElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  
  const title2 = useRef<HTMLInputElement>(null)
  const content2= useRef<HTMLTextAreaElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  
  const loading = <Loading/> 

  useEffect(()=> {

    if (clickBtn === '공지사항') {
      one.current?.classList.add('testChoiceBtn')
      two.current?.classList.remove('testChoiceBtn')
      setChoiceBtn(false)
      
    } else if (clickBtn === '질문') {
      two.current?.classList.add('testChoiceBtn')
      one.current?.classList.remove('testChoiceBtn')
      setChoiceBtn(true)
    } else {
      one.current?.classList.add('testChoiceBtn')
      two.current?.classList.remove('testChoiceBtn')
      setChoiceBtn(false)
    }
  },[clickBtn])

  const onClick:MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    if ((isClickBtn) && (clickBtn === '공지사항')) {
      if (clickBtn === target.ariaLabel) {
        setIsClickBtn(false)
        setClickBtn(null)
      } else {
        setClickBtn('질문')
      }
    } else if ((isClickBtn) && (clickBtn === '질문')) {
      if (clickBtn === target.ariaLabel) {
        setIsClickBtn(false)
        setClickBtn(null)
      } else {
        setClickBtn('공지사항')
      }
    } else if (isClickBtn === false) {
      if (target.ariaLabel === '공지사항') {
        setClickBtn('공지사항')
      } else {
        setClickBtn('질문')
      }
      setIsClickBtn(true)
    }
  }

  const addComp = () => {
    if (choiceBtn === false) {
      setisNoticeAdd(!isNoticeAdd)
    } else {
      setisFaqAdd(!isFaqAdd)
    }
  }

  const click:MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const target = e.target as HTMLElement 
    if (target.ariaLabel === '목록으로' ) {
      setisNoticeAdd(false)
    } else if (target.ariaLabel === '생성하기') {
      const body = {
        content: content.current?.value, 
        title: title.current?.value, 
        userId: adminUserId
      }
      postNotice(body).unwrap().then((r)=> {
        if (r.message === 'success') {
          toast.success('공지사항 추가가 완료되었습니다.')
        } else {
          toast.error('요청에 문제가 있습니다.')
        }
        setisNoticeAdd(false)
      })
      .then(()=> {
        window.location.replace('/notice')
      })
    }
  }

  const click2:MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const target = e.target as HTMLElement 
    if (target.ariaLabel === '목록으로' ) {
      setisFaqAdd(false)
    } else if (target.ariaLabel === '생성하기') {
      const body = {
        content: content2.current?.value, 
        title: title2.current?.value, 
        userId: adminUserId
      }
      postFaq(body).unwrap().then((r)=> {
        if (r.message === 'success') {
          toast.success('Faq 추가가 완료되었습니다.')
        } else {
          toast.error('요청에 문제가 있습니다.')
        }
        setisFaqAdd(false)
      })
      .then(()=> {
        window.location.replace('/notice')
      })
    }
  }

  const addNoticeModal = (
    <div ref={ref} className="flex justify-center items-center absolute mx-auto w-full h-screen top-0 bg-slate-400/60 z-10 "  onClick={(e)=> {
      if (e.target === ref.current) {
        setisNoticeAdd(false)
    }}}>
      <div className="flex flex-col justify-start items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[60%] lg:h-[80%] bg-white">
        <div className="flex flex-col w-[80%] pt-16">
          {/* <div className="flex justify-center items-center text-[2rem] text-[#A87E6E] font-semibold py-5">DETAIL</div> */}
          <div className="flex justify-start">
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full text-[1.5rem] md:text-[2rem] font-bold">
                <div className="w-full"><input className="w-full" ref={title} type="text" placeholder="Title" /> </div>
              </div>
            </div>
          </div>          
        </div>
        <div className="flex justify-center items-center w-full h-full border-t-2 my-2 py-5">
          <div className="flex flex-col w-[80%] h-[90%] my-5">
            <div className="w-full h-[90%] text-[1.2rem] md:text-[1.5rem] mb-4"><textarea ref={content} className="w-full h-full overflow-y-auto" placeholder="Content" /></div>
            <div className="flex justify-center w-full">
              <div aria-label="목록으로" className="text-center w-[80%] h-[10%] text-[#BF9F91] text-[1.3rem] md:text-[1.7rem] font-semibold cursor-pointer" onClick={click}>목록으로</div>
              <div aria-label="생성하기" className="text-center w-[80%] h-[10%] text-[#BF9F91] text-[1.3rem] md:text-[1.7rem] font-semibold cursor-pointer" onClick={click}>생성하기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const addFaqModal = (
    <div ref={ref2} className="flex justify-center items-center absolute mx-auto w-full h-screen top-0 bg-slate-400/60 z-10 "  onClick={(e)=> {
      if (e.target === ref2.current) {
        setisFaqAdd(false)
    }}}>
      <div className="flex flex-col justify-start items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[60%] lg:h-[80%] bg-white">
        <div className="flex flex-col w-[80%] pt-16">
          {/* <div className="flex justify-center items-center text-[2rem] text-[#A87E6E] font-semibold py-5">DETAIL</div> */}
          <div className="flex justify-start">
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full text-[1.5rem] md:text-[2rem] font-bold">
                <div className="w-full"><input className="w-full" ref={title2} type="text" placeholder="Title" /> </div>
              </div>
            </div>
          </div>          
        </div>
        <div className="flex justify-center items-center w-full h-full border-t-2 my-2 py-5">
          <div className="flex flex-col w-[80%] h-[90%] my-5">
            <div className="w-full h-[90%] text-[1.2rem] md:text-[1.5rem] mb-4"><textarea ref={content2} className="w-full h-full overflow-y-auto" placeholder="Content" /></div>
            <div className="flex justify-center w-full">
              <div aria-label="목록으로" className="text-center w-[80%] h-[10%] text-[#BF9F91] text-[1.3rem] md:text-[1.7rem] font-semibold cursor-pointer" onClick={click2}>목록으로</div>
              <div aria-label="생성하기" className="text-center w-[80%] h-[10%] text-[#BF9F91] text-[1.3rem] md:text-[1.7rem] font-semibold cursor-pointer" onClick={click2}>생성하기</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* {(isLoading1||isLoading2)&&loading} */}
      {isNoticeAdd&&addNoticeModal}
      {isFaqAdd&&addFaqModal}
      <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto border-b-2">
        <div className="flex justify-between text-center font-semibold text-[#A87E6E] text-[1rem] md:text-[1.3rem]">
          <div className="flex justify-start">
            <div ref={one} aria-label="공지사항" className="mr-4 px-4 py-2 border-b-white border-b-4 cursor-pointer testChoiceBtn testChoiceBtnHover" onClick={onClick}>공지사항</div>
            <div ref={two} aria-label="질문" className="mr-4 px-4 py-2 border-b-white border-b-4 cursor-pointer testChoiceBtn testChoiceBtnHover" onClick={onClick}>자주묻는 질문</div>
          </div>
          {isAdmin&&<div className="text-[#A87E6E] px-4 py-2 cursor-pointer" onClick={addComp}>
            +
          </div>}
        </div>
      </div>
    </>
  )
}

interface NoticeType {
  noticeId: number,
  userId: number,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
}

function NoticeSection3({isAdmin}:(boolean|any)) {
  const [getNotice, {isLoading:isLoading1}] = useLazyGetNoticeQuery()
  const [putNoticeDetail, {isLoading:isLoading2}] = usePutNoticeDetailMutation()
  const [deleteNotice, {isLoading:isLoading3}] = useDeleteNoticeMutation()
  const [noticeList, setNoticeList] = useState<NoticeType[]>([])
  const [noticeComponent, setNoticeComponent] = useState<any>(null)
  const [isNoticeClick, setIsNoticeClick] = useState(false)
  const [noticeDetail, setNoticeDetail] = useState<(NoticeType|null|any)>(null)
  
  const userId = useRef<HTMLInputElement>(null)
  const title = useRef<HTMLInputElement>(null)
  const content= useRef<HTMLTextAreaElement>(null)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=> {
    getNotice('').unwrap().then((r)=> {
      // console.log(r.data);
      
      const noticeList = [...r.data].reverse()
      setNoticeList(noticeList)
    })
  },[getNotice])
  
  useEffect(() => {
    if (noticeList !== null) {
      setNoticeComponent(noticeList.map((notice, idx) => {
        const data = notice.title.split(']')
  
        return (
          <div key={idx} className="flex justify-between text-[1rem] md:text-[1.3rem] px-3 py-2 cursor-pointer border-b-2" onClick={() => {
            setIsNoticeClick(!isNoticeClick)
            setNoticeDetail(notice)
          }}>
            <div><span className="text-[#666666] font-semibold">{data[0]}]</span> <span>{data[1]}</span></div>
            <div className="text-black/70 text-[0.9rem] md:text-[1.1rem]">{notice.createdAt.split('T')[0]}</div>
          </div>
        )
      }))
    }
  }, [noticeList])

  const click:MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const target = e.target as HTMLElement 
    if (target.ariaLabel === '취소' || target.ariaLabel === '목록으로' ) {
      setIsNoticeClick(false)
    } else if (target.ariaLabel === '수정') {
      putNoticeDetail([noticeDetail?.noticeId, content.current?.value, title.current?.value, userId.current?.value]).unwrap().then((r)=> {
        if (r.message === 'success') {
          toast.success('수정이 완료되었습니다.')
        } else {
          toast.error('요청에 문제가 있습니다.')
        }
        setIsNoticeClick(false)
      }).then(()=> {
        window.location.replace('/notice')
      })
    } else {
      deleteNotice(noticeDetail?.noticeId).unwrap().then((r)=> {
        
        if (r.message === 'success') {
          toast.success('삭제가 완료되었습니다.')
        } else {
          toast.error('요청에 문제가 있습니다.')
        }
        setIsNoticeClick(false)
      }).then(()=> {
        window.location.replace('/notice')
      })
    }
  }

  const detailNotice = (
    <div ref={ref} className="flex justify-center items-center absolute mx-auto w-full h-screen top-0 bg-slate-400/60 z-10 " onClick={(e)=> {
      if (e.target === ref.current) {
        setIsNoticeClick(false)
    }}}>
      {
        isAdmin? 
        (
          <div className="flex flex-col justify-start items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[60%] md:h-[80%] bg-white">
            <div className="flex flex-col justify-center items-start w-[80%] h-[20%] pt-4">
              <div className="flex justify-start w-full">
                <div className="flex flex-col w-full">
                  <div className="w-full text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-bold overflow-x-auto">
                    <input className="w-full" ref={title} type="text" defaultValue={noticeDetail?.title} />
                  </div>
                  <div className="flex justify-between items-end w-full">
                    <div className="w-1/2 text-[#666666] text-[0.7rem] md:text-[1.2rem] lg:text-[1.3rem]">{noticeDetail?.createdAt.split('T')[0]}</div>
                    <div className="flex justify-end w-1/2 text-center text-[0.7rem] md:text-[1.2rem] lg:text-[1.3rem] text-[#8E8E8E]">
                      <div aria-label="수정" className={`flex justify-center items-center w-1/4 mx-1 border-[#DDDDDD] border-2 rounded-sm noticeChoiceBtn`} onClick={click}>수정</div>
                      <div aria-label="삭제" className={`flex justify-center items-center w-1/4 mx-1 border-[#DDDDDD] border-2 rounded-sm noticeChoiceBtn`} onClick={click}>삭제</div>
                    </div>
                  </div>
                </div>
              </div>          
            </div>
            <div className="flex justify-center items-start w-full h-[80%] border-t-2 my-2 py-5">
              <div className="flex flex-col w-[80%] h-[90%] my-5 relative">
                <div className="w-full h-[90%] text-[0.7rem] md:text-[0.9rem] lg:text-[1.1rem] overflow-y-auto mb-4 whitespace-pre-wrap leading-5"><textarea ref={content} className="w-full h-full " defaultValue={noticeDetail?.content} /></div>
                <div aria-label="목록으로" className="text-start w-[80%] h-[10%] text-[#BF9F91] text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] font-semibold cursor-pointer" onClick={click}>목록으로</div>
              </div>
            </div>
          </div>
        ): 
        (
          <div className="flex flex-col justify-start items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[60%] md:h-[80%] bg-white">
            <div className="flex flex-col justify-center items-start w-[80%] h-[20%] pt-4">
              <div className="flex justify-start w-full">
                <div className="flex flex-col w-full">
                  <div className="w-full text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-bold overflow-x-auto">
                    <span className="text-[#666666]">{noticeDetail?.title.split(']')[0]}]</span>
                    <span>{noticeDetail?.title.split(']')[1]}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-[#666666] text-[0.7rem] md:text-[1.2rem] lg:text-[1.3rem]">{noticeDetail?.createdAt.split('T')[0]}</div>
                  </div>
                </div>
              </div>          
            </div>
            <div className="flex justify-center items-start w-full h-[80%] border-t-2 my-2 py-5">
              <div className="flex flex-col w-[80%] h-full">
                <div className="w-full h-[90%] text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] overflow-y-auto mb-4 whitespace-pre-wrap leading-5">
                  <ReactMarkdown children={noticeDetail?.content} />
                  {/* {noticeDetail?.content} */}
                </div>
                <div aria-label="목록으로" className="text-start w-[80%] h-[10%] text-[#BF9F91] text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] font-semibold cursor-pointer" onClick={click}>목록으로</div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )



  const isLoading = <Loading/>
  return (
    <>
      {/* {(isLoading1||isLoading2||isLoading3)&&isLoading} */}
      {isNoticeClick&&detailNotice}
      <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto my-5">
        {noticeComponent === null? null: noticeComponent}
      </div>
    </>
  )
}




function NoticeSection4({isAdmin}:(boolean|any)) {
  const [getFaq, {isLoading:isLoading1}] = useLazyGetFaqQuery()
  const [putFaqDetail, {isLoading:isLoading2}] = usePutFaqDetailMutation()
  const [deleteFaq, {isLoading:isLoading3}] = useDeleteFaqMutation()
  const [FaqList, setFaqList] = useState<NoticeType[]>([])
  const [FaqComponent, setFaqComponent] = useState<any>(null)
  const [isFaqClick, setIsFaqClick] = useState(false)
  const [FaqDetail, setFaqDetail] = useState<(NoticeType|null|any)>(null)
  
  const userId = useRef<HTMLInputElement>(null)
  const title = useRef<HTMLInputElement>(null)
  const content= useRef<HTMLTextAreaElement>(null)

  const ref = useRef<HTMLDivElement>(null)

  useEffect(()=> {
    getFaq('').unwrap().then((r)=> {      
      const reverseFaqList = [...r.data].reverse()
      setFaqList(reverseFaqList)
    })
  },[getFaq])

  useEffect(()=> {
    if (FaqList !== null) {
      setFaqComponent(FaqList.map((faq, idx)=> {
        const data = faq.title.split(']') 
        
        return (
          <div key={idx} className="flex justify-between text-[1rem] md:text-[1.3rem] px-3 py-2 cursor-pointer border-b-2" onClick={()=>{
            setIsFaqClick(!isFaqClick)
            setFaqDetail(faq)
            }}>
            <div><span className="text-[#666666] font-semibold">{data[0]}]</span> <span>{data[1]}</span></div>
            <div className="text-black/70 text-[0.9rem] md:text-[1.1rem]">{faq.createdAt.split('T')[0]}</div>
          </div>
        )
      }))
    }
  },[FaqList])

  

  const click:MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    const target = e.target as HTMLElement 
    if (target.ariaLabel === '취소' || target.ariaLabel === '목록으로' ) {
      setIsFaqClick(false)
    } else if (target.ariaLabel === '수정') {
      putFaqDetail([FaqDetail?.noticeId, content.current?.value, title.current?.value, userId.current?.value]).unwrap().then((r)=> {
        if (r.message === 'success') {
          toast.success('수정이 완료되었습니다.')
        } else {
          toast.error('요청에 문제가 있습니다.')
        }
        setIsFaqClick(false)
      }).then(()=> {
        window.location.replace('/notice')
      })
    } else {
      deleteFaq(FaqDetail?.noticeId).unwrap().then((r)=> {
        
        if (r.message === 'success') {
          toast.success('삭제가 완료되었습니다.')
        } else {
          toast.error('요청에 문제가 있습니다.')
        }
        setIsFaqClick(false)
      }).then(()=> {
        window.location.replace('/notice')
      })
    }
  }

  const faqNotice = (
    <div ref={ref} className="flex justify-center items-center absolute mx-auto w-full h-screen top-0 bg-slate-400/60 z-10 " onClick={(e)=> {
      if (e.target === ref.current) {
        setIsFaqClick(false)
    }}}>
      {
        isAdmin? 
        (
          <div className="flex flex-col justify-start items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[60%] md:h-[80%] bg-white">
            <div className="flex flex-col justify-center items-start w-[80%] h-[20%] pt-4">
              <div className="flex justify-start w-full">
                <div className="flex flex-col w-full">
                  <div className="w-full text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-bold overflow-x-auto">
                    <input className="w-full" ref={title} type="text" defaultValue={FaqDetail?.title} />
                  </div>
                  <div className="flex justify-between items-end w-full">
                    <div className="w-1/2 text-[#666666] text-[0.7rem] md:text-[1.1rem] lg:text-[1.2rem]">{FaqDetail?.createdAt.split('T')[0]}</div>
                    <div className="flex justify-end w-1/2 text-center text-[0.7rem] md:text-[1.1rem] lg:text-[1.2rem] text-[#8E8E8E]">
                      <div aria-label="수정" className={`flex justify-center items-center w-1/4 mx-1 border-[#DDDDDD] border-2 rounded-sm noticeChoiceBtn`} onClick={click}>수정</div>
                      <div aria-label="삭제" className={`flex justify-center items-center w-1/4 mx-1 border-[#DDDDDD] border-2 rounded-sm noticeChoiceBtn`} onClick={click}>삭제</div>
                    </div>
                  </div>
                </div>
              </div>          
            </div>
            <div className="flex justify-center items-start w-full h-[80%] border-t-2 my-2 py-5">
              <div className="flex flex-col w-[80%] h-[90%] my-5 relative">
                <div className="w-full h-[90%] text-[0.7rem] md:text-[0.9rem] lg:text-[1.1rem] overflow-y-auto mb-4 whitespace-pre-wrap leading-5"><textarea ref={content} className="w-full h-full " defaultValue={FaqDetail?.content} /></div>
                <div aria-label="목록으로" className="text-start w-[80%] h-[10%] text-[#BF9F91] text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] font-semibold cursor-pointer" onClick={click}>목록으로</div>
              </div>
            </div>
          </div>
        ): 
        (
          <div className="flex flex-col justify-start items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-[60%] md:h-[80%] bg-white">
            <div className="flex flex-col justify-center items-start w-[80%] h-[20%] pt-4">
              <div className="flex justify-start">
                <div className="flex flex-col w-full">
                  <div className="w-full text-[1rem] md:text-[1.2rem] lg:text-[1.5rem] font-bold overflow-x-auto">
                    <span className="text-[#666666]">{FaqDetail?.title.split(']')[0]}]</span>
                    <span>{FaqDetail?.title.split(']')[1]}</span>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="w-1/2 text-[#666666] text-[0.7rem] md:text-[1.1rem] lg:text-[1.2rem]">{FaqDetail?.createdAt.split('T')[0]}</div>
                  </div>
                </div>
              </div>          
            </div>
            <div className="flex justify-center items-start w-full h-[80%] border-t-2 my-2 py-5">
              <div className="flex flex-col w-[80%] h-full">
                <div className="w-full h-[90%] text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] overflow-y-auto mb-4 whitespace-pre-wrap leading-5">
                  <ReactMarkdown children={FaqDetail?.content} />
                </div>
                <div aria-label="목록으로" className="text-start w-[80%] h-[10%] text-[#BF9F91] text-[0.8rem] md:text-[1rem] lg:text-[1.1rem] font-semibold cursor-pointer" onClick={click}>목록으로</div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )

  

  const isLoading = <Loading/>
  return (
    <>
      {/* {(isLoading1||isLoading2||isLoading3)&&isLoading} */}
      {isFaqClick&&faqNotice}
      <div className="container max-w-screen-xl w-[90%] lg:w-full mx-auto my-5">
        {FaqComponent === null? null: FaqComponent}
      </div>
    </>
  )
}