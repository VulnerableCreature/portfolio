import Tag from "./project/Tag";

export default function ContactSection() {
  return (
    <section
      id="contacts"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-8 pb-24"
    >
      <div className="grid gap-8 rounded-3xl border border-white/10 bg-linear-to-b from-violet-500/15 via-white/3 to-rose-500/10 p-8 md:p-16">
        <h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight text-white md:text-5xl">
          Есть идея или задача? Давайте обсудим.
        </h2>
        <div className="flex flex-wrap gap-3">
          <Tag key={"email"}>Email: MescheryakovLV@yandex.ru</Tag>
          <Tag key={"telegram"}>Telegram: @cute_lion</Tag>
          <Tag key={"vk"}>ВКонтакте: @sweet_lion</Tag>
          <Tag key={"hh"}>hh profile</Tag>
        </div>
      </div>
    </section>
  );
}
