import { useState } from "react";

// ─── Design tokens ──────────────────────────────────────────────────────────
const C = {
  navy: "#1F4566",
  blue: "#4A8FC2",
  skyBg: "#F0F8FE",
  skyBorder: "#D6EAFA",
  yellow: "#FFC94A",
  lemonBg: "#FFFBF0",
  lemonBorder: "#F5E6B8",
  cream: "#FFFFFF",
  gray: "#6B7B8C",
  grayLight: "#B4B2A9",
  green: "#4A7A2E",
  greenBg: "#E6F4D9",
};

// ─── Shared components ───────────────────────────────────────────────────────
const Avatar = ({ initials, color = C.blue, size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", background: color,
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontWeight: 600, fontSize: size * 0.35, flexShrink: 0,
  }}>{initials}</div>
);

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{
    background: C.cream, border: `1px solid ${C.skyBorder}`, borderRadius: 14,
    padding: "14px 16px", cursor: onClick ? "pointer" : "default",
    transition: "border-color .15s",
    ...style,
  }}
    onMouseEnter={e => onClick && (e.currentTarget.style.borderColor = C.blue)}
    onMouseLeave={e => onClick && (e.currentTarget.style.borderColor = C.skyBorder)}
  >{children}</div>
);

const Btn = ({ children, onClick, variant = "primary", style = {} }) => {
  const base = {
    border: "none", borderRadius: 8, padding: "9px 18px", fontWeight: 600,
    fontSize: 13, cursor: "pointer", transition: "opacity .15s", ...style,
  };
  const variants = {
    primary: { background: C.blue, color: "#fff" },
    secondary: { background: C.skyBg, color: C.navy, border: `1px solid ${C.skyBorder}` },
    yellow: { background: C.yellow, color: C.navy },
    danger: { background: "#FEE2E2", color: "#991B1B" },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant] }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >{children}</button>
  );
};

const Tag = ({ children, color = C.skyBg, text = C.navy }) => (
  <span style={{
    background: color, color: text, borderRadius: 20, padding: "3px 10px",
    fontSize: 11, fontWeight: 600,
  }}>{children}</span>
);

const StatusDot = ({ online }) => (
  <span style={{
    width: 8, height: 8, borderRadius: "50%", display: "inline-block",
    background: online ? C.green : C.grayLight, flexShrink: 0,
  }} />
);

// ─── Screen: Sign In ─────────────────────────────────────────────────────────
function SignIn({ go }) {
  const [step, setStep] = useState("login"); // login | age | privacy | done
  const [dob, setDob] = useState("");
  const [err, setErr] = useState("");
  const [name, setName] = useState("");

  function checkAge() {
    if (!dob) { setErr("Please enter your date of birth."); return; }
    const age = Math.floor((Date.now() - new Date(dob)) / (365.25 * 24 * 3600 * 1000));
    if (age < 18) { setErr("You must be 18 or older to use Tuesday."); return; }
    setErr(""); setStep("privacy");
  }

  return (
    <div style={{ minHeight: "100vh", background: C.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ marginBottom: 24, textAlign: "center" }}>
        <p style={{ fontSize: 36, fontWeight: 800, color: C.yellow, margin: 0 }}>Tuesday</p>
        <p style={{ fontSize: 14, color: "#CADCFC", margin: "4px 0 0" }}>Show up to work, on your own terms.</p>
      </div>
      <div style={{ background: C.cream, borderRadius: 18, padding: 28, width: "100%", maxWidth: 360 }}>
        {step === "login" && <>
          <p style={{ fontWeight: 700, fontSize: 16, color: C.navy, margin: "0 0 4px" }}>Welcome</p>
          <p style={{ fontSize: 13, color: C.gray, margin: "0 0 20px" }}>Sign in to enter your spaces</p>
          <Btn variant="secondary" style={{ width: "100%", marginBottom: 12 }} onClick={() => setStep("age")}>
            🔵 Continue with Google
          </Btn>
          <p style={{ fontSize: 11, color: C.grayLight, margin: 0, textAlign: "center" }}>18+ only · anonymous by default · email never shown</p>
        </>}
        {step === "age" && <>
          <p style={{ fontWeight: 700, fontSize: 16, color: C.navy, margin: "0 0 4px" }}>Confirm your age</p>
          <p style={{ fontSize: 13, color: C.gray, margin: "0 0 16px" }}>Tuesday is for adults 18 and older</p>
          <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 6 }}>Date of birth</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 14, marginBottom: 12, boxSizing: "border-box" }} />
          {err && <p style={{ fontSize: 12, color: "#DC2626", margin: "0 0 10px" }}>{err}</p>}
          <Btn style={{ width: "100%" }} onClick={checkAge}>Continue</Btn>
        </>}
        {step === "privacy" && <>
          <p style={{ fontWeight: 700, fontSize: 16, color: C.navy, margin: "0 0 4px" }}>Set up your identity</p>
          <p style={{ fontSize: 13, color: C.gray, margin: "0 0 16px" }}>Choose how others see you in rooms</p>
          <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 6 }}>Display name</label>
          <input placeholder="e.g. Maya R, or a nickname" value={name} onChange={e => setName(e.target.value)}
            style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 14, marginBottom: 14, boxSizing: "border-box" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
            {[["Hide my email from other users", true], ["Blur my video background by default", false], ["Use an avatar instead of live video", false]].map(([label, checked]) => (
              <label key={label} style={{ display: "flex", gap: 8, fontSize: 13, cursor: "pointer", alignItems: "center" }}>
                <input type="checkbox" defaultChecked={checked} style={{ width: "auto" }} /> {label}
              </label>
            ))}
          </div>
          <Btn style={{ width: "100%" }} onClick={() => go("home")}>Enter Tuesday →</Btn>
        </>}
      </div>
    </div>
  );
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────
function Home({ go }) {
  const people = [
    { initials: "JE", name: "Jess", where: "Library · quiet", online: true, color: C.yellow },
    { initials: "MR", name: "Marco (Acme Studio)", where: "Cowork space", online: true, color: C.blue },
    { initials: "PK", name: "Priya (Acme Studio)", where: "Offline since 2pm", online: false, color: C.grayLight },
  ];
  return (
    <Screen title="Your room" sub="Quiet here · no one else around" go={go}>
      <Card style={{ background: C.skyBg, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: C.navy, margin: 0 }}>My home</p>
          <Btn variant="yellow" style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => go("space")}>Customize</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[{ e: "🪟", l: "Window" }, { e: "🖥️", l: "Desk" }, { e: "🪴", l: "Plant" }].map(({ e, l }) => (
            <div key={l} style={{ background: C.cream, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{e}</div>
              <div style={{ fontSize: 11, color: C.gray, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 6 }}>Your status</label>
        <select style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13 }}>
          <option>Available</option>
          <option>Focusing, do not disturb</option>
          <option>On a call</option>
          <option>Away</option>
        </select>
      </div>

      <p style={{ fontSize: 12, fontWeight: 600, color: C.gray, margin: "0 0 8px" }}>Who's around</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
        {people.map(p => (
          <Card key={p.name} style={{ background: C.lemonBg, borderColor: C.lemonBorder, display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
            <Avatar initials={p.initials} color={p.color} size={32} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: C.navy }}>{p.name}</p>
              <p style={{ fontSize: 11, color: C.gray, margin: "2px 0 0" }}>{p.where}</p>
            </div>
            <StatusDot online={p.online} />
          </Card>
        ))}
      </div>

      <Btn style={{ width: "100%" }} onClick={() => go("spaces")}>View all my spaces →</Btn>
    </Screen>
  );
}

// ─── Screen: Spaces (entry) ───────────────────────────────────────────────────
function Spaces({ go }) {
  return (
    <Screen title="Good afternoon" sub="Where do you want to work?" go={go}>
      <p style={{ fontSize: 12, fontWeight: 600, color: C.gray, margin: "0 0 8px" }}>My spaces</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {[
          { name: "Me & Jess", count: "2 people", online: "1 online", icon: "👭" },
          { name: "Acme Studio", count: "5 people", online: "3 online", icon: "🏢" },
        ].map(s => (
          <Card key={s.name} onClick={() => go("space")} style={{ display: "flex", alignItems: "center", gap: 12, background: C.lemonBg, borderColor: C.lemonBorder }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, margin: 0, color: C.navy }}>{s.name}</p>
              <p style={{ fontSize: 12, color: C.gray, margin: "2px 0 0" }}>{s.count} · private</p>
            </div>
            <Tag color={C.greenBg} text={C.green}>{s.online}</Tag>
          </Card>
        ))}
        <Card style={{ borderStyle: "dashed", textAlign: "center", padding: "16px 12px", color: C.gray }}>
          <p style={{ margin: 0, fontSize: 13 }}>+ New space</p>
          <p style={{ margin: "2px 0 0", fontSize: 11 }}>Invite people you know</p>
        </Card>
      </div>

      <p style={{ fontSize: 12, fontWeight: 600, color: C.gray, margin: "0 0 8px" }}>Explore public rooms</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { name: "Sales floor", sub: "High energy", count: "8 here", icon: "⚡", bg: C.blue },
          { name: "Campus library", sub: "Quiet, study vibe", count: "23 here", icon: "📚", bg: C.lemonBg, dark: false },
          { name: "Lounge", sub: "Casual chat", count: "14 here", icon: "☕", bg: C.blue },
        ].map(r => (
          <Card key={r.name} onClick={() => go("room")} style={{ display: "flex", alignItems: "center", gap: 12, background: r.bg, borderColor: r.bg === C.lemonBg ? C.lemonBorder : r.bg }}>
            <span style={{ fontSize: 22 }}>{r.icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 14, margin: 0, color: r.bg === C.blue ? "#fff" : C.navy }}>{r.name}</p>
              <p style={{ fontSize: 12, margin: "2px 0 0", color: r.bg === C.blue ? "#CADCFC" : C.gray }}>{r.sub}</p>
            </div>
            <Tag color="rgba(255,255,255,0.2)" text={r.bg === C.blue ? "#fff" : C.navy}>{r.count}</Tag>
          </Card>
        ))}
      </div>
      <p style={{ fontSize: 11, color: C.grayLight, margin: "10px 0 0" }}>🔒 In public rooms you appear as "Anon Newt"</p>
    </Screen>
  );
}

// ─── Screen: Space (Acme Studio) ──────────────────────────────────────────────
function Space({ go }) {
  const [tab, setTab] = useState("tasks");
  const tasks = [
    { title: "Finalize client deck", due: "Due today", who: "MR", color: C.blue, done: false },
    { title: "Review Q3 budget", due: "Due tomorrow", who: "PK", color: C.grayLight, done: false },
    { title: "Send vendor invoices", due: "Done yesterday", who: "JE", color: C.yellow, done: true },
  ];

  return (
    <Screen title="Acme Studio" sub="5 people · 3 online" go={go}>
      <Card style={{ background: C.blue, borderColor: C.blue, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14, color: "#fff", margin: 0 }}>Weekly standup</p>
            <p style={{ fontSize: 12, color: "#CADCFC", margin: "2px 0 0" }}>Cowork space · starts in 12 min</p>
          </div>
          <Btn variant="yellow" style={{ padding: "6px 14px", fontSize: 12 }} onClick={() => go("room")}>Join →</Btn>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {["tasks", "meetings"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer",
            background: tab === t ? C.blue : C.skyBg, color: tab === t ? "#fff" : C.navy,
            fontWeight: 600, fontSize: 13,
          }}>{t === "tasks" ? "Tasks" : "Meetings"}</button>
        ))}
      </div>

      {tab === "tasks" && <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.gray, margin: 0 }}>Shared tasks</p>
          <Btn variant="yellow" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => go("create")}>+ New</Btn>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tasks.map(t => (
            <Card key={t.title} style={{ display: "flex", alignItems: "center", gap: 10, background: C.lemonBg, borderColor: C.lemonBorder, padding: "10px 12px" }}>
              <input type="checkbox" defaultChecked={t.done} style={{ width: "auto", flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: C.navy, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.5 : 1 }}>{t.title}</p>
                <p style={{ fontSize: 11, color: C.gray, margin: "2px 0 0" }}>{t.due}</p>
              </div>
              <Avatar initials={t.who} color={t.color} size={26} />
            </Card>
          ))}
        </div>
      </>}

      {tab === "meetings" && <>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: C.gray, margin: 0 }}>Scheduled meetings</p>
          <Btn variant="yellow" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => go("create")}>+ New</Btn>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { name: "Weekly standup", when: "Today · 3:00 PM", room: "Cowork space", who: ["MR", "JE", "PK"] },
            { name: "Q3 budget review", when: "Tomorrow · 10:00 AM", room: "Lounge", who: ["PK", "MR"] },
          ].map(m => (
            <Card key={m.name} style={{ background: C.lemonBg, borderColor: C.lemonBorder }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, margin: 0, color: C.navy }}>{m.name}</p>
                  <p style={{ fontSize: 11, color: C.gray, margin: "2px 0 0" }}>{m.when} · {m.room}</p>
                </div>
                <Btn style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => go("room")}>Join</Btn>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {m.who.map(w => <Avatar key={w} initials={w} color={C.blue} size={22} />)}
              </div>
            </Card>
          ))}
        </div>
      </>}

      <div style={{ marginTop: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: C.gray, margin: "0 0 8px" }}>Who's in a room</p>
        {[
          { name: "Marco", where: "Cowork space", initials: "MR" },
          { name: "Jess", where: "Library", initials: "JE" },
        ].map(p => (
          <Card key={p.name} onClick={() => go("room")} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, background: C.skyBg, padding: "10px 12px" }}>
            <Avatar initials={p.initials} color={C.blue} size={28} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: C.navy }}>{p.name}</p>
              <p style={{ fontSize: 11, color: C.gray, margin: "2px 0 0" }}>{p.where}</p>
            </div>
            <StatusDot online={true} />
          </Card>
        ))}
      </div>
    </Screen>
  );
}

// ─── Screen: Create task/meeting ──────────────────────────────────────────────
function Create({ go }) {
  const [tab, setTab] = useState("task");
  return (
    <Screen title="Create" sub="Add to Acme Studio" go={go}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["task", "meeting"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "7px 0", borderRadius: 8, border: "none", cursor: "pointer",
            background: tab === t ? C.blue : C.skyBg, color: tab === t ? "#fff" : C.navy,
            fontWeight: 600, fontSize: 13,
          }}>{t === "task" ? "New task" : "New meeting"}</button>
        ))}
      </div>

      {tab === "task" && <>
        <Field label="Task name" placeholder="e.g. Finalize client deck" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 4 }}>Assign to</label>
            <select style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13 }}>
              {["Me", "Marco", "Jess", "Priya"].map(n => <option key={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 4 }}>Due date</label>
            <input type="date" style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13, boxSizing: "border-box" }} />
          </div>
        </div>
        <Card style={{ background: C.skyBg, borderColor: C.skyBorder, display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14 }}>
          <span>🔒</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: C.navy }}>Visible only within Acme Studio</p>
            <p style={{ fontSize: 12, color: C.gray, margin: "2px 0 0" }}>Tasks never appear in public rooms</p>
          </div>
        </Card>
        <Btn style={{ width: "100%" }} onClick={() => go("space")}>Create task</Btn>
      </>}

      {tab === "meeting" && <>
        <Field label="Meeting name" placeholder="e.g. Weekly standup" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 4 }}>Room</label>
            <select style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13 }}>
              {["Cowork space", "Lounge", "Library (silent)", "Home (private call)"].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 4 }}>Time</label>
            <input type="time" style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13, boxSizing: "border-box" }} />
          </div>
        </div>
        <Field label="Who's invited" type="select" options={["Everyone in Acme Studio", "Just me & Marco", "Custom..."]} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
          {[
            ["Mute mic and camera by default on entry", true],
            ["Invite-only: block non-invited people from joining", true],
            ["Show my real name to this group (overrides anonymous mode)", false],
          ].map(([label, checked]) => (
            <label key={label} style={{ display: "flex", gap: 8, fontSize: 12, cursor: "pointer", alignItems: "flex-start" }}>
              <input type="checkbox" defaultChecked={checked} style={{ width: "auto", marginTop: 2 }} /> {label}
            </label>
          ))}
        </div>
        <Btn style={{ width: "100%" }} onClick={() => go("space")}>Schedule meeting</Btn>
      </>}
    </Screen>
  );
}

const Field = ({ label, placeholder, type = "input", options = [] }) => (
  <div style={{ marginBottom: 12 }}>
    <label style={{ fontSize: 12, color: C.gray, display: "block", marginBottom: 4 }}>{label}</label>
    {type === "select"
      ? <select style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13 }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      : <input placeholder={placeholder} style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13, boxSizing: "border-box" }} />
    }
  </div>
);

// ─── Screen: Room (live cowork room) ──────────────────────────────────────────
function Room({ go }) {
  const [muted, setMuted] = useState(true);
  const [cam, setCam] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { who: "Marco", text: "Hey, dropping in to work on the deck", time: "2:47 PM" },
    { who: "Jess", text: "Same! Library is quiet today", time: "2:49 PM" },
  ]);

  function send() {
    if (!msg.trim()) return;
    setChat(c => [...c, { who: "You", text: msg, time: "now" }]);
    setMsg("");
  }

  const tiles = [
    { name: "You", initials: "AN", color: C.blue, muted: muted, cam: cam },
    { name: "Marco", initials: "MR", color: C.yellow, muted: false, cam: true },
    { name: "Jess", initials: "JE", color: "#97C459", muted: true, cam: false },
  ];

  return (
    <Screen title="Weekly standup" sub={`Cowork space · ${tiles.length} here`} go={go} noPad>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, padding: "12px 16px 0" }}>
        {tiles.map(t => (
          <div key={t.name} style={{ background: t.color, borderRadius: 12, padding: "14px 8px", textAlign: "center", position: "relative" }}>
            <Avatar initials={t.initials} color="rgba(255,255,255,0.25)" size={36} />
            <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", margin: "8px 0 0" }}>{t.name}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 4, marginTop: 4 }}>
              {t.muted && <Tag color="rgba(0,0,0,0.2)" text="#fff">🔇</Tag>}
              {!t.cam && <Tag color="rgba(0,0,0,0.2)" text="#fff">📷off</Tag>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={{ background: C.skyBg, border: `1px solid ${C.skyBorder}`, borderRadius: 12, marginTop: 12, marginBottom: 10, padding: 10, height: 100, overflowY: "auto" }}>
          {chat.map((m, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 12, color: C.navy }}>{m.who}</span>
              <span style={{ fontSize: 11, color: C.grayLight, marginLeft: 6 }}>{m.time}</span>
              <p style={{ fontSize: 12, color: C.gray, margin: "2px 0 0" }}>{m.text}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Message the room..." style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${C.skyBorder}`, fontSize: 13 }} />
          <Btn onClick={send}>Send</Btn>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant={muted ? "secondary" : "primary"} style={{ flex: 1, padding: "8px 0" }} onClick={() => setMuted(m => !m)}>
            {muted ? "🔇 Muted" : "🎤 Live"}
          </Btn>
          <Btn variant={cam ? "primary" : "secondary"} style={{ flex: 1, padding: "8px 0" }} onClick={() => setCam(c => !c)}>
            {cam ? "📷 On" : "📷 Off"}
          </Btn>
          <Btn variant="danger" style={{ flex: 1, padding: "8px 0" }} onClick={() => go("space")}>Leave</Btn>
        </div>
      </div>
    </Screen>
  );
}

// ─── Screen shell ─────────────────────────────────────────────────────────────
function Screen({ title, sub, go, children, noPad }) {
  return (
    <div style={{ minHeight: "100vh", background: C.skyBg, display: "flex", flexDirection: "column", maxWidth: 420, margin: "0 auto" }}>
      <div style={{ background: C.navy, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: C.yellow, margin: 0 }}>Tuesday</p>
          <p style={{ fontSize: 12, color: "#CADCFC", margin: "2px 0 0" }}>{title} · {sub}</p>
        </div>
        <Avatar initials="AN" color={C.blue} size={34} />
      </div>
      <div style={{ padding: noPad ? 0 : 16, flex: 1 }}>
        {children}
      </div>
      <Nav go={go} />
    </div>
  );
}

// ─── Bottom navigation ────────────────────────────────────────────────────────
function Nav({ go }) {
  const tabs = [
    { id: "home", label: "Home", emoji: "🏠" },
    { id: "spaces", label: "Spaces", emoji: "🗺️" },
    { id: "space", label: "Studio", emoji: "🏢" },
    { id: "create", label: "Create", emoji: "➕" },
    { id: "room", label: "Room", emoji: "🎥" },
  ];
  return (
    <div style={{ background: C.cream, borderTop: `1px solid ${C.skyBorder}`, display: "flex" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => go(t.id)} style={{
          flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
        }}>
          <span style={{ fontSize: 18 }}>{t.emoji}</span>
          <span style={{ fontSize: 10, color: C.gray }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── App root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("signin");
  const screens = { signin: SignIn, home: Home, spaces: Spaces, space: Space, create: Create, room: Room };
  const Screen = screens[screen] || Home;
  return <Screen go={setScreen} />;
}
