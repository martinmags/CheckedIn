import Image from "next/image";
import styles from "./page.module.css";
import { lusitana } from '@/app/ui/fonts';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={lusitana.className}>Checked In</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis sunt perspiciatis unde natus laudantium? Ex ipsam, earum labore tempora quidem, praesentium suscipit inventore aspernatur saepe iusto cum! Minima, nisi inventore?</p>
    </main>
  );
}
