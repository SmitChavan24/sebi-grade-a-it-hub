# Artificial Intelligence and Machine Learning

## Types of learning

| Type | Data | Goal | Examples |
|---|---|---|---|
| **Supervised** | Labelled | Predict a label/value | Regression, classification (fraud/not fraud) |
| **Unsupervised** | Unlabelled | Find structure | Clustering, dimensionality reduction, **anomaly detection** |
| **Semi-supervised** | Mostly unlabelled | Use a few labels | Common in fraud, where labels are scarce |
| **Reinforcement** | Reward signal | Learn a policy | Trading agents, control systems |

## Core algorithms to recognise

**Supervised:** linear regression, logistic regression, decision trees, **random forest**, **gradient boosting (XGBoost/LightGBM)**, SVM, k-NN, Naive Bayes, neural networks.
**Unsupervised:** **k-means**, hierarchical clustering, DBSCAN, **PCA**, isolation forest, autoencoders.

## The workflow

```
Problem framing -> data collection -> EDA -> cleaning and feature engineering
-> train/validation/test split -> model selection -> training -> evaluation
-> deployment -> monitoring (drift) -> retraining
```

**Feature engineering** usually matters more than algorithm choice. **Data leakage** — letting information from the future or from the target into the features — is the most common cause of a model that works in testing and fails in production.

## Evaluation

**Confusion matrix** → TP, FP, TN, FN.

- **Accuracy** = (TP+TN)/total — **misleading on imbalanced data**. A fraud model that predicts "not fraud" always can be 99.9% accurate and useless.
- **Precision** = TP/(TP+FP) — of what we flagged, how much was real. *This is what controls analyst workload in a surveillance system.*
- **Recall / Sensitivity** = TP/(TP+FN) — of what was real, how much did we catch.
- **F1** = harmonic mean of precision and recall.
- **ROC-AUC**, **PR-AUC** (better for heavy imbalance).
- Regression: MAE, MSE, RMSE, R².

**Bias-variance trade-off:** **underfitting** (high bias — too simple) vs **overfitting** (high variance — memorises noise). Controls: more data, **cross-validation**, **regularisation (L1 lasso — sparse; L2 ridge)**, dropout, early stopping, pruning, ensembling.

## Deep learning

**Neural network** = layers of weighted sums plus non-linear **activation functions** (ReLU, sigmoid, tanh, softmax), trained by **backpropagation** with gradient descent (SGD, Adam). **Vanishing/exploding gradients**, batch normalisation.

**Architectures:** **CNN** (images, spatial), **RNN/LSTM/GRU** (sequences, time series), **Transformer** (attention; the basis of modern **LLMs**), GAN (generation), diffusion models.

**LLMs:** pre-training, fine-tuning, **RAG** (retrieval-augmented generation), prompt engineering, **hallucination** as the core reliability problem, context windows, and the distinction between a model that *retrieves* a fact and one that *generates* a plausible-looking one.

## AI in financial regulation — and its risks

**Uses:** surveillance anomaly detection, complaint triage and routing, document and filing analysis (NLP), KYC/identity matching, credit and risk scoring, chatbot investor assistance, and automating routine supervisory review.

**Risks a regulator must weigh — know these, they make the difference in an interview:**
1. **Explainability.** An enforcement action must be justified. Black-box outputs are weak evidence; SHAP/LIME help but do not fully solve it. Use ML for **triage**, human analysis for the case.
2. **Bias and fairness.** Models learn historical patterns, including historical unfairness.
3. **Model risk and drift.** Markets change; a model trained on last year's behaviour degrades. Requires monitoring and governance (validation, documentation, periodic review) — the same discipline banks apply under model risk management.
4. **Herding and correlated behaviour.** If many participants use similar models, they may act identically and amplify a move — a genuine systemic concern with AI in trading.
5. **Data privacy** under DPDP, and proportionality of surveillance.
6. **Accountability.** A decision must be attributable to a person, not "the model".
7. **Adversarial manipulation.** Deepfakes for fraud, and attempts to game known detection thresholds.

SEBI has been consulting on **responsible AI/ML usage by market participants**, including disclosure of AI/ML use by intermediaries. Know the direction of travel.

---

## Exam pointers

1. **Accuracy is useless on imbalanced data** — quote precision, recall and PR-AUC instead.
2. **L1 = Lasso (feature selection), L2 = Ridge.**
3. **Overfitting = high variance; underfitting = high bias.**
4. Transformers underpin LLMs; **attention** is the mechanism.
5. For any AI-in-regulation answer, pair the use case with **explainability, model risk and accountability**.
