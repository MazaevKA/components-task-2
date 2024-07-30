import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const onNextButtonClick = () => {
		if (activeIndex < steps.length - 1) {
			setActiveIndex((updatedValue) => updatedValue + 1);
		}
	};

	const onPrevButtonClick = () => {
		if (activeIndex > 0) {
			setActiveIndex((updatedValue) => updatedValue - 1);
		}
	};

	const onStartButtonClick = () => {
		setActiveIndex(0);
	};

	const onRandomButtonClick = (event) => {
		setActiveIndex((updatedValue) => (updatedValue = Number(event.target.innerText) - 1));
	};

	let firstStep = activeIndex === 0;
	let lastStep = activeIndex === steps.length - 1;

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps.map((item, index) => (activeIndex === index ? item.content : false))}
					</div>

					<ul className={styles['steps-list']}>
						{steps.map((item, index) => (
							<li
								className={
									styles['steps-item'] +
									(index === activeIndex ? ` ${styles.active}` : '') +
									(index < activeIndex ? ` ${styles.done}` : '')
								}
								onClick={onRandomButtonClick}
							>
								<button className={styles['steps-item-button']} key={item.id}>
									{index + 1}
								</button>
								{item.title}
							</li>
						))}
					</ul>

					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onPrevButtonClick}
							disabled={firstStep}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={lastStep ? onStartButtonClick : onNextButtonClick}
						>
							{lastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
