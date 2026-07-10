"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  { title: "Soft Signal", cn: "柔软信号", type: "Brand Direction", year: "2026", text: "为感官护理品牌建立一套轻盈而有触感的视觉语言，让颜色、材质与文字形成同一种呼吸。" },
  { title: "After Rain", cn: "雨后", type: "Visual Identity", year: "2026", text: "从雨水折射与城市反光出发，为独立音乐企划设计动态识别与发行视觉。" },
  { title: "Daily Orbit", cn: "日常轨道", type: "Digital Experience", year: "2025", text: "把日常习惯转化为视觉轨迹的数字产品，在微小记录里看见持续发生的改变。" },
  { title: "Moss Archive", cn: "苔藓档案", type: "Editorial Design", year: "2025", text: "采集城市边缘的微型生态，以编号、拓印与摄影构成一套关于缓慢生长的视觉档案。" },
  { title: "Night Market", cn: "夜市电波", type: "Campaign", year: "2025", text: "从霓虹、叫卖与摊位手写字中提炼一套高能量的城市夜游活动视觉。" },
  { title: "New Folk", cn: "新民艺", type: "Art Direction", year: "2025", text: "传统手工艺与当代生活方式的重新连接，以克制的编排承载温暖的手作痕迹。" },
  { title: "Echo Room", cn: "回声房间", type: "Spatial Visuals", year: "2024", text: "为声音展览设计的空间图形系统，让信息在尺度、回声与留白之间移动。" },
  { title: "Little Worlds", cn: "小小世界", type: "Illustration", year: "2024", text: "一组关于观察与想象的插画实验，把普通物件变成可以短暂停留的微型世界。" },
  { title: "Blue Hour", cn: "蓝色时刻", type: "Motion Identity", year: "2024", text: "为影像栏目建立随时间变化的动态片头，在日与夜之间保留一段未命名的蓝。" },
  { title: "Open Kitchen", cn: "开放厨房", type: "Brand System", year: "2024", text: "为社区餐桌打造友好、直接的品牌系统，鼓励人们带一道菜，也带来一段故事。" },
  { title: "Tender Type", cn: "柔软字体", type: "Type Experiment", year: "2024", text: "一套关于触觉、拉伸与情绪的字体实验，让字形在阅读与图像之间自由变化。" },
  { title: "Field Notes", cn: "野外笔记", type: "Publication", year: "2023", text: "把旅行中的声音、植物、路标与片段文字整理为可持续生长的视觉出版物。" },
];

export default function Home() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [panel, setPanel] = useState<"index" | "about" | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActive(null);
        setPanel(null);
      }
    };
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      if (event.data?.type !== "lailai:open-project") return;
      const index = Number(event.data.index);
      if (!Number.isInteger(index) || index < 0 || index >= projects.length) return;
      setPanel(null);
      setActive(index);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const project = active === null ? null : projects[active];

  return (
    <main className="lab-shell">
      <iframe
        ref={frameRef}
        className="core-frame"
        src="/lailai-core.html"
        title="LAILAI LAB 3D 作品环"
        aria-label="可横向拖拽旋转的 LAILAI LAB 作品集合"
      />

      <div className="corner-mark" aria-hidden="true">LAILAI LAB<br />PORTFOLIO<br />2024—26</div>
      <nav className="lab-nav" aria-label="作品集导航">
        <button onClick={() => setPanel("index")}>Index <sup>{projects.length}</sup></button>
        <button onClick={() => setPanel("about")}>About</button>
      </nav>
      <div className="drag-note" aria-hidden="true">DRAG TO ROTATE ↔</div>

      {panel && (
        <div className="panel-layer" role="dialog" aria-modal="true" aria-labelledby={`${panel}-title`}>
          <button className="panel-backdrop" onClick={() => setPanel(null)} aria-label="关闭面板" />
          <section className={`lab-panel ${panel === "about" ? "about-panel" : ""}`}>
            <header className="panel-header">
              <span>({panel === "index" ? "Selected Works" : "About"})</span>
              <button onClick={() => setPanel(null)}>Close ×</button>
            </header>

            {panel === "index" ? (
              <>
                <h1 id="index-title">WORK<br />INDEX</h1>
                <div className="work-list">
                  {projects.map((item, index) => (
                    <button key={item.title} onClick={() => { setActive(index); setPanel(null); }}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <b>{item.title}</b>
                      <i>{item.type}</i>
                      <em>{item.year}</em>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h1 id="about-title">IDEAS<br />MADE<br />VISIBLE.</h1>
                <div className="about-copy">
                  <p>莱莱是一位关注品牌、视觉与数字体验的独立设计师。LAILAI LAB 收集商业合作，也保留尚未被定义的个人练习。</p>
                  <dl>
                    <div><dt>Services</dt><dd>Creative direction<br />Brand identity<br />Digital experience<br />Editorial & campaign</dd></div>
                    <div><dt>Contact</dt><dd><a href="mailto:hello@lailailab.studio">hello@lailailab.studio</a><br />Based in China<br />Working worldwide</dd></div>
                  </dl>
                </div>
              </>
            )}
          </section>
        </div>
      )}

      {project && (
        <div className="project-layer" role="dialog" aria-modal="true" aria-labelledby="project-title">
          <button className="panel-backdrop" onClick={() => setActive(null)} aria-label="关闭作品详情" />
          <article className="project-sheet">
            <header className="panel-header">
              <span>({String(active! + 1).padStart(2, "0")} / {projects.length})</span>
              <button onClick={() => setActive(null)}>Close ×</button>
            </header>
            <div className="project-heading">
              <span>{project.type}<br />{project.year}</span>
              <h1 id="project-title">{project.title}</h1>
              <p>{project.cn}</p>
            </div>
            <div className="project-footer">
              <p>{project.text}</p>
              <button onClick={() => setActive((active! + 1) % projects.length)}>Next project →</button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
