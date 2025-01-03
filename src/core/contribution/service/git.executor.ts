import { Injectable, Logger } from '@nestjs/common';
import { CommitDto } from '../../commit/dto/commit.dto';
import { promisify } from 'util';
import { exec } from 'child_process';
import { format } from 'date-fns';

const execAsync = promisify(exec);

@Injectable()
export class GitExecutor {
    private readonly logger = new Logger(GitExecutor.name);

    private readonly COMMITS_HISTORY_REPO = '/Users/simon/Work/Personal/gitlab_commits';

    constructor() {}

    async run(commit: CommitDto): Promise<void> {
        const date = format(new Date(commit.committedAt), 'EEE MMM dd hh:mm yyyy xxx');
        this.logger.log(`Creating commit: ${commit.hash} - ${date}`);
        try {
            await this.createCommitFile(commit);
            await this.add();
            await this.commit(date, commit.title);
            await this.push();
        } catch (error) {
            this.logger.error(`Error executing Git commands: ${error.message}`, error.stack);
            throw new Error('Failed to execute Git commands.');
        }
    }

    async createCommitFile(commit: CommitDto): Promise<void> {
        await this.executeCommand(`mkdir -p ${this.COMMITS_HISTORY_REPO}/${commit.source}`);
        await this.executeCommand(`touch ${this.COMMITS_HISTORY_REPO}/${commit.source}/${commit.hash}.json`);
        await this.executeCommand(`echo ${commit.title} > ${this.COMMITS_HISTORY_REPO}/${commit.title}.json`);
    }

    async add(): Promise<void> {
        await this.executeCommand(`git -C ${this.COMMITS_HISTORY_REPO} add .`);
    }

    async commit(date: string, message: string): Promise<void> {
        await this.executeCommand(
            `GIT_AUTHOR_DATE="${date}" GIT_COMMITTER_DATE="${date}" git -C ${this.COMMITS_HISTORY_REPO} commit -m "${message}"`,
        );
    }

    async push(): Promise<void> {
        await this.executeCommand(`git -C '${this.COMMITS_HISTORY_REPO}' push`);
    }

    private async executeCommand(command: string): Promise<void> {
        try {
            const { stdout, stderr } = await execAsync(command);

            if (stdout) {
                this.logger.debug(`Output: ${stdout.trim()}`);
            }

            if (stderr) {
                this.logger.warn(`Warning/Error: ${stderr.trim()}`);
            }
        } catch (error: any) {
            this.logger.error(`Command failed: ${error.message}`);
            throw new Error(`Command execution failed: ${command}\n${error.message}`);
        }
    }
}
